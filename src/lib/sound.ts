"use client";

class SoundEngine {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;
  private radioAudio: HTMLAudioElement | null = null;
  public isRadioPlaying: boolean = false;
  private rainAudio: HTMLAudioElement | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playSfx(
    name:
      | "coins"
      | "harvest"
      | "plant"
      | "water"
      | "success"
      | "interact"
      | "denied"
      | "build"
      | "fire-crackle"
      | "bird"
      | "hoe"
      | "seed",
    volume = 0.5
  ) {
    if (this.muted || typeof window === "undefined") return;
    const mappedName = name === "hoe" ? "build" : name === "seed" ? "plant" : name;
    try {
      const audio = new Audio(`/game-assets/audio/${mappedName}.wav`);
      audio.volume = Math.min(1, Math.max(0, volume));
      audio.play().catch(() => {});
    } catch {
      // ignore autoplay blocks
    }
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.muted) {
      if (this.radioAudio) this.radioAudio.pause();
      if (this.rainAudio) this.rainAudio.pause();
    } else if (this.isRadioPlaying && this.radioAudio) {
      this.radioAudio.play().catch(() => {});
    }
    return this.muted;
  }

  public switchTrack(track: "radio" | "village"): boolean {
    if (typeof window === "undefined") return false;
    const src =
      track === "radio"
        ? "/game-assets/audio/village-radio.ogg"
        : "/game-assets/audio/garden.wav";
    if (this.radioAudio) {
      this.radioAudio.pause();
    }
    this.radioAudio = new Audio(src);
    this.radioAudio.loop = true;
    this.radioAudio.volume = 0.32;
    this.isRadioPlaying = track === "radio";
    if (!this.muted) {
      this.radioAudio.play().catch(() => {});
    }
    return this.isRadioPlaying;
  }

  public setWeatherAudio(weather: "sun" | "rain" | "sunset" | "night") {
    if (typeof window === "undefined") return;
    if (weather === "rain" && !this.muted) {
      if (!this.rainAudio) {
        this.rainAudio = new Audio("/game-assets/audio/water.wav");
        this.rainAudio.loop = true;
        this.rainAudio.volume = 0.25;
      }
      this.rainAudio.play().catch(() => {});
    } else if (this.rainAudio) {
      this.rainAudio.pause();
    }
    if (weather === "sun" && !this.muted) {
      this.playSfx("bird", 0.3);
    }
  }

  public playThunder() {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 1.6);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.75);
  }

  public toggleRadio(): boolean {
    if (typeof window === "undefined") return false;
    if (!this.radioAudio) {
      this.radioAudio = new Audio("/game-assets/audio/village-radio.ogg");
      this.radioAudio.loop = true;
      this.radioAudio.volume = 0.35;
    }
    if (this.isRadioPlaying) {
      this.radioAudio.pause();
      this.isRadioPlaying = false;
    } else {
      this.radioAudio.play().catch(() => {
        this.radioAudio = new Audio("/game-assets/audio/garden.wav");
        this.radioAudio.loop = true;
        this.radioAudio.volume = 0.35;
        this.radioAudio.play().catch(() => {});
      });
      this.isRadioPlaying = true;
    }
    return this.isRadioPlaying;
  }

  public playBambooPegTick(speedRatio = 1) {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    const baseFreq = 340 + Math.min(300, speedRatio * 200);
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.042);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(920, now);
    filter.Q.setValueAtTime(3.2, now);

    const vol = Math.min(0.36, 0.12 + speedRatio * 0.2);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.048);
  }

  public playChargeTick(chargeRatio: number) {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(220 + chargeRatio * 520, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  }

  public playBronzeGong() {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [196, 293.66, 392, 587.33, 784];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 0.992, now + 1.45);

      const amp = 0.15 / (idx + 1);
      gain.gain.setValueAtTime(amp, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.5);
    });
  }

  public play(
    name:
      | "coins"
      | "harvest"
      | "plant"
      | "water"
      | "success"
      | "interact"
      | "denied"
      | "build"
      | "fire-crackle"
      | "bird",
    volume = 0.5
  ) {
    this.playSfx(name, volume);
  }

  public playGong() {
    this.playBronzeGong();
  }
}

export const soundEngine = new SoundEngine();

