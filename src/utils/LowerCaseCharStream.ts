import { CharStream } from 'antlr4ts';
import { Interval } from 'antlr4ts/misc/Interval';

export class LowerCaseCharStream implements CharStream {
  private readonly stream: CharStream;

  /**
   * Constructs a new LowerCaseCharStream wrapping the given {@link CharStream} forcing all
   * characters to lower case.
   * @param {CharStream} stream The stream to wrap.
   */
  constructor(stream: CharStream) {
    this.stream = stream;
  }

  getText(interval: Interval): string {
    return this.stream.getText(interval);
  }

  consume(): void {
    this.stream.consume();
  }

  LA(i: number): number {
    const c = this.stream.LA(i);
    if (c <= 0) {
      return c;
    }
    return String.fromCharCode(c).toLowerCase().charCodeAt(0);
  }

  mark(): number {
    return this.stream.mark();
  }

  release(marker: number): void {
    this.stream.release(marker);
  }
  seek(index: number): void {
    this.stream.seek(index);
  }

  get index(): number {
    return this.stream.index;
  }

  get size(): number {
    return this.stream.size;
  }

  get sourceName(): string {
    return this.stream.sourceName;
  }
}
