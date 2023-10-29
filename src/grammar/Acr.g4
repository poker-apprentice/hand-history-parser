grammar Acr;

// file entry
handHistory: line | ((line EOL)+ line);
line:
  ( lineMeta
  | lineTable
  | linePlayer
  | linePost
  | lineStreet
  | lineDeal
  | lineAction
  | lineUncalled
  | lineShowdown
  | lineResult
  | lineTotalPot
  | lineAwardPot
  | lineMisc
  );

// lines of text
lineMeta       : 'Hand' '#' handNumber '-' variant '(' bettingStructure ')' '-' chipCount '/' chipCount '-' timestamp;
lineTable      : tableName tableSize '-max' ('Seat' buttonPosition 'is' 'the' 'button')?;
linePlayer     : 'Seat' seatNumber ':' playerName '(' chipCount ')';
linePost       : playerName 'posts' 'the'? blindType? chipCount;
lineStreet     : '***' STREET '***' boardSections?;
lineDeal       : 'Dealt' 'to' playerName board;
lineAction     : playerName action;
lineUncalled   : 'Uncalled' 'bet' '(' chipCount ')' 'returned' 'to' playerName;
lineShowdown   : showdownShow | showdownMuck;
lineResult     : 'Seat' seatNumber ':' playerName ('(' position ')')? playerShowdown;
lineTotalPot   : 'Total pot' chipCount '|' 'Rake' chipCount ('|' 'JP Fee' chipCount)?;
lineAwardPot   : playerName 'collected' chipCount 'from' (mainPot | sidePot);
lineMisc       :
  (
    (playerName 'waits for big blind')
    | (('Main pot' | ('Side pot' '(' INT ')')) chipCount | 'Rake' chipCount)
    | (playerName 'folded on the' street)
  );

// parser rules
handNumber   : INT;
seatNumber   : INT;
timestamp    : INT '/' INT '/' INT INT ':' INT ':' INT 'UTC';
variant      : 'Holdem' | 'Omaha' | 'Omaha H/L' | '7Stud' | '7Stud H/L';
bettingStructure : 'No Limit' | 'Pot Limit' | 'Fixed Limit';
chipCount    : '$' value;
value        : (INT ',')* INT ('.' INT)?;
tableName    : (WORD | '-')+;
tableSize    : INT;
buttonPosition : INT;
playerName   : USERNAME;
blindType    : 'ante' | 'small blind' | 'big blind';
boardSections : board+;
board        : '[' cards ']';
cards        : card+;
card         : CARD;
mainPot      : 'main pot';
sidePot      : 'side pot' '-' INT;
action       : actionBringIn | actionFold | actionCheck | actionBet | actionCall | actionRaise;
actionBringIn : 'brings in' chipCount;
actionFold    : 'folds';
actionCheck   : 'checks';
actionBet     : 'bets' chipCount 'and is all-in'?;
actionCall    : 'calls' chipCount 'and is all-in'?;
actionRaise   : 'raises' chipCount 'to' chipCount 'and is all-in'?;
showdownShow  : playerName 'shows' board '(' complexFinalHandSummary ')';
showdownMuck  : playerName 'does not show';
finalHandSummary : handStrength ',' WORD+ board ')';
complexFinalHandSummary : (finalHandSummary | ('HI' '-' finalHandSummary '|' 'LO' '-' board));
handStrength  : 'a high card' | 'a pair' | 'two pair' | 'three of a kind' | 'a straight' | 'a flush' | 'a full house' | 'four of a kind' | 'a straight flush' | 'a royal flush';
position      : 'small blind' | 'big blind' | 'button';
street        : '3rd Street' | '4th Street' | '5th Street' | '6th Street' | '7th Street' | 'Pre-Flop' | 'Flop' | 'Turn' | 'River';
playerShowdown : playerShowdownFolded | playerShowdownWonShow | playerShowdownWonMuck | playerShowdownLost;
playerShowdownFolded : 'folded on the' street 'and did not bet'?;
playerShowdownWonShow : 'showed' board 'and won' chipCount 'with' complexFinalHandSummary;
playerShowdownWonMuck : 'did not show' 'and won' chipCount;
playerShowdownLost   : 'showed' board 'and lost with' ('HI' '-')? finalHandSummary;

// lexer rules
STREET       : 'HOLE CARDS' | 'FLOP' | 'TURN' | 'RIVER' | '3rd STREET' | '4th STREET' | '5th STREET' | '6th STREET' | '7th STREET' | 'SHOW DOWN' | 'SUMMARY';
INT          : [0-9]+;
CARD         : [2-9TJQKA][cdhs];
WORD         : [A-Za-z]+;
USERNAME     : [A-Za-z0-9.]+;
EOL          : '\r' | '\n' | '\r\n';
WS           : [ \t]+ -> skip;
