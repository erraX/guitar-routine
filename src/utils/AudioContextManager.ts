export class AudioContextManager {
  private audioContext = new AudioContext();

  private audioBuffer: AudioBuffer | null = null;

  private pendingBuffer: Promise<AudioBuffer> | null = null;

  constructor(private url: string, loadOnstart = true) {
    this.url = url;
    if (loadOnstart) {
      this.load();
    }
  }

  public async load() {
    if (this.audioBuffer !== null) {
      return;
    }
    const buffer = await this.getBuffer();
    this.audioBuffer = buffer;
  }

  public async play() {
    if (this.audioBuffer === null) {
      await this.load();
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(this.audioContext.destination);
    source.start();
  }

  private getBuffer(): Promise<AudioBuffer> {
    if (this.pendingBuffer !== null) {
      return this.pendingBuffer;
    }

    const request = new XMLHttpRequest();

    this.pendingBuffer = new Promise((resolve, reject) => {
      request.open('GET', this.url, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        this.audioContext.decodeAudioData(request.response, (buffer) => {
          if (buffer) {
            resolve(buffer);
          } else {
            reject(new Error('decoding error'));
          }
          this.pendingBuffer = null;
        });
      };
      request.onerror = (error) => reject(error);
      request.send();
    });

    return this.pendingBuffer;
  }
}
