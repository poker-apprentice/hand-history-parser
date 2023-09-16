import {
  ANTLRErrorListener,
  ANTLRErrorStrategy,
  BailErrorStrategy,
  CharStreams,
  CommonTokenStream,
  Lexer,
  Parser,
  Token,
} from 'antlr4ts';

interface Constructable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

interface Options<L extends Lexer, P extends Parser> {
  lexer: Constructable<L>;
  parser: Constructable<P>;
  errorHandler?: ANTLRErrorStrategy;
  errorListener?: ANTLRErrorListener<Token>;
}

export const getParser = <L extends Lexer, P extends Parser>(
  str: string,
  {
    lexer: LexerClass,
    parser: ParserClass,
    errorHandler = new BailErrorStrategy(),
    errorListener,
  }: Options<L, P>,
) => {
  const inputStream = CharStreams.fromString(str);
  const lexer = new LexerClass(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new ParserClass(tokenStream);

  parser.errorHandler = errorHandler;

  parser.removeErrorListeners();
  lexer.removeErrorListeners();
  if (errorListener) {
    parser.addErrorListener(errorListener);
    lexer.addErrorListener(errorListener);
  }

  return parser;
};
