import {
  ANTLRErrorStrategy,
  BailErrorStrategy,
  CharStreams,
  CommonTokenStream,
  Lexer,
  Parser,
} from 'antlr4ts';
import { LowerCaseCharStream } from './LowerCaseCharStream';

interface Constructable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

interface Options<L extends Lexer, P extends Parser> {
  lexer: Constructable<L>;
  parser: Constructable<P>;
  errorHandler?: ANTLRErrorStrategy;
}

export const getParser = <L extends Lexer, P extends Parser>(
  str: string,
  { lexer: LexerClass, parser: ParserClass, errorHandler = new BailErrorStrategy() }: Options<L, P>,
) => {
  const inputStream = new LowerCaseCharStream(CharStreams.fromString(str));
  const lexer = new LexerClass(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new ParserClass(tokenStream);

  parser.errorHandler = errorHandler;

  return parser;
};
