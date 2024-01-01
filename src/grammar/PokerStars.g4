grammar PokerStars;

// file entry
handHistory: line | ((line EOL)+ line);
line:
  ( lineHandIndex
  | lineCashGameMeta
  | lineTournamentMeta
  | lineTableMeta
  | linePlayer
  | linePostSmallBlind
  | linePostBigBlind
  | linePostAnte
  | lineStreet
  | lineDeal
  | lineAction
  | lineUncalled
  | lineShowdown
  | lineResult
  | lineTotalPot
  | lineBoard
  | lineActionSummary
  | lineAwardBounty
  | lineTournamentPlacement
  | lineMisc
  );
lineHandIndex: '*'+ '#' INT '*'+;
lineCashGameMeta: 'PokerStars' 'Hand' '#' handNumber ':' variant bettingStructure '(' blinds currency ')' '-' timestamp;
lineTournamentMeta: 'PokerStars' 'Hand' '#' handNumber ':' 'Tournament' '#' tournamentNumber ',' buyIn ('+' bountyChip)? '+' entryFee currency variant bettingStructure '-' 'Level' levelNumber '(' blinds ')' '-' timestamp;
lineTableMeta: 'Table' '\'' tableName '\'' tableSize 'Seat' '#' INT 'is' 'the' 'button';
linePlayer: 'Seat' INT ':' playerName '(' playerChips playerBounty? ')';
linePostSmallBlind: playerName ':' 'posts' 'small' 'blind' currencyValue;
linePostBigBlind: playerName ':' 'posts' 'big' 'blind' currencyValue;
linePostAnte: playerName ':' 'posts' 'the' 'ante' currencyValue;
lineStreet: '*'+ STREET_HEADING '*'+ cardCollection*;
lineDeal: 'Dealt' 'to' playerName cardCollection;
lineAction: playerName ':' action;
lineUncalled: 'Uncalled' 'bet' '(' currencyValue ')' 'returned' 'to' playerName;
lineResult: playerName 'collected' currencyValue 'from' 'pot';
lineShowdown: playerName ':'
  ( 'doesn\'t' 'show' 'hand'
  | 'mucks' 'hand'
  | 'shows' cardCollection '(' handStrength ('-' handStrengthKicker)? ')'
  );
lineTotalPot: 'Total' 'pot' currencyValue '|' 'Rake' currencyValue;
lineBoard: 'Board' cardCollection;
lineActionSummary: 'Seat' INT ':' playerName '(' position ')' actionSummary;
lineAwardBounty: playerName 'wins' currencyValue 'for' 'eliminating' playerName 'and' 'their' 'own' 'bounty' 'increases' 'by' currencyValue 'to' currencyValue;
lineTournamentPlacement: playerName 'finished' 'the' 'tournament' 'in' placement ('nd' | 'st' | 'rd' | 'th') 'place' 'and' 'received' currencyValue '.';
lineMisc:
  ( playerName 'leaves' 'the' 'table'
  | playerName 'joins' 'the' 'table' 'at' 'seat' '#' INT
  | playerName 'will' 'be' 'allowed' 'to' 'play' 'after' 'the' 'button'
  );

handNumber: INT;
tournamentNumber: INT;
variant: 'Hold\'em';
bettingStructure: 'No Limit';
blinds: currencyValue '/' currencyValue;
currencyValue: '$' DECIMAL;
currency: WORD;
timestamp: INT '/' INT '/' INT INT ':' INT ':' INT timezone;
timezone: WORD;
tableName: (~'\'')+;
tableSize: INT '-' 'max';
playerName: USERNAME;
playerChips: currencyValue 'in' 'chips';
playerBounty: ',' currencyValue 'in' 'bounty';
cardCollection: '[' cards ']';
cards: CARD+;
position: 'small blind' | 'big blind' | 'dealer';
actionSummary:
  ( 'folded' 'before' 'Flop' ('(' 'didn\t' 'bet' ')')? |
  | 'folded' 'on' 'the' ('Flop' | 'Turn' | 'River')
  | 'collected' '(' currencyValue ')'
  | 'showed' cardCollection 'and' 'won' '(' currencyValue ')' 'with' handStrength
  | 'showed' cardCollection 'and' 'lost' 'with' handStrength
  | 'mucked' cardCollection?
  );
action:
  ( actionBet
  | actionCall
  | actionCheck
  | actionFold
  | actionRaise
  );
actionBet: 'bets' currencyValue allIn?;
actionCall: 'calls' currencyValue allIn?;
actionCheck: 'checks';
actionFold: 'folds';
actionRaise: 'raises' currencyValue 'to' currencyValue allIn?;
allIn: 'and' 'is' 'all-in';
handStrength:
  ( 'high' 'card' WORD
  | 'a' 'pair' 'of' WORD
  | 'two' 'pair' ',' WORD+
  | 'three' 'of' 'a' 'kind' ',' WORD
  | 'a' 'straight' ',' WORD+
  | 'a' 'flush' ',' WORD+
  | 'a' 'full' 'house' ',' WORD+
  | 'four' 'of' 'a' 'kind' ',' WORD // TODO: determine if this is correct
  | 'a' 'straight' 'flush' ',' WORD // TODO: determine if this is correct
  | 'a' 'royal' 'flush' ',' WORD // TODO: determine if this is correct
  );
handStrengthKicker: WORD ('+' WORD)? 'kicker';
buyIn: currencyValue;
bountyChip: currencyValue;
entryFee: currencyValue;
levelNumber: ROMAN_NUMERALS;
placement: INT;

INT: [0-9]+;
DECIMAL: (INT ',')* INT ('.' INT)?;
USERNAME: [a-z0-9$_ ]+;
STREET_HEADING: 'HOLE CARDS' | 'FLOP' | 'TURN' | 'RIVER' | 'SHOW DOWN' | 'SUMMARY';
ROMAN_NUMERALS: [ivxlcdm]+;
CARD: [2-9tjqka][cdhs];
WORD: [a-z]+;
EOL: '\r' | '\n' | '\r\n';
WS: [ \t]+ -> skip;
