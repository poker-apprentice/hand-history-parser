grammar Ignition;

// file entry
handHistory: line | ((line EOL)+ line);
line:
  ( lineMeta
  | linePlayer
  | lineDealer
  | lineSmallBlind
  | lineBigBlind
  | linePost
  | lineStreet
  | lineHandsDealt
  | lineMisc
  | lineAction
  | lineMuck
  | lineUncalled
  | lineShowdown
  | lineResult
  | lineTotalPot
  | lineBoard
  | lineActionSummary
  );

// lines of text
lineMeta       : site 'Hand' '#' handNumber fastFold? ('TBL#' | 'ID#') tableNumber variant bettingStructure '-' timestamp;
linePlayer     : 'Seat' seatNumber COLON position ME? '(' chipCount 'in chips)';
lineDealer     : ('Dealer' ME? COLON)? 'Set dealer' ('[' INT ']')?;
lineSmallBlind : ('Small Blind' | 'Dealer') ME? COLON 'Small Blind' chipCount;
lineBigBlind   : 'Big Blind' ME? COLON 'Big blind' chipCount;
linePost       : position ME? COLON 'Posts' DEAD? 'chip' chipCount;
lineStreet     : '***' STREET '***' boardSections?;
lineHandsDealt : position ME? COLON 'Card dealt to a spot' hand;
lineMisc       :
  (position ME? COLON)?
  (
    'Table deposit' chipCount
    | 'Seat sit down'
    | 'Seat sit out'
    | 'Seat stand'
    | 'Seat re-join'
    | 'Table enter user'
    | 'Table leave user'
    | 'Sitout' forcedActionReason
    | 'Enter' forcedActionReason
    | 'Leave' forcedActionReason
  );
lineAction     : position ME? COLON action;
lineMuck       : position ME? COLON 'Does not show' hand '(' handStrength ')';
lineUncalled   : position ME? COLON 'Return uncalled portion of bet' chipCount;
lineShowdown   : position ME? COLON showdownAction  hand? '(' handStrength ')';
lineResult     : position ME? COLON 'Hand result' ('-' SIDEPOT)? chipCount;
lineTotalPot   : 'Total Pot' '(' chipCount ')';
lineBoard      : 'Board' board;
lineActionSummary:
  'Seat+' INT COLON position
  (
    'Folded' ('before'|'on') 'the' STREET
    | 'HI'? chipCount? '[Does not show]'
    | '[Mucked]' hand
    | 'HI'? winHighResult ('LO' winLowResult)?
    | 'LO' winLowResult
    | loseResult
  );

// parser rules
handNumber   : INT;
seatNumber   : INT;
tableNumber  : INT;
timestamp    : INT '-' INT '-' INT INT ':' INT ':' INT;
site         : 'Bodog' | 'Bovada' | 'Ignition';
variant      : 'HOLDEM' | 'OMAHA' | 'OMAHA HiLo' | 'HOLDEMZonePoker' | 'OMAHAZonePoker';
bettingStructure : 'No Limit' | 'Pot Limit' | 'Limit';
fastFold     : FASTFOLD;
position     : 'Small Blind' | 'Big Blind' | 'UTG' | 'UTG+1' | 'UTG+2' | 'Dealer';
chipCount    : '$' value;
value        : (INT ',')* INT ('.' INT)?;
board        : '[' cards ']';
boardSections : board+;
hand         : '[' cards ']';
handAndBoard : '[' cards '-' cards ']';
cards        : card+;
card         : CARD;
handStrength : 'High Card' | 'One pair' | 'Two pair' | 'Three of a kind' | 'Straight' | 'Flush' | 'Full House' | 'Four of a kind' | 'Straight Flush' | 'Royal Straight Flush';
action       : actionFold | actionCheck | actionBet | actionCall | actionRaise | actionAllIn | actionAllInRaise;
actionFold   : 'Folds' (forcedActionReason | '& shows' hand)?;
actionCheck  : 'Checks' forcedActionReason?;
actionBet    : 'Bets' chipCount;
actionCall   : 'Calls' chipCount;
actionRaise  : 'Raises' chipCount 'to' chipCount;
actionAllIn  : 'All-in' chipCount;
actionAllInRaise : 'All-in' '(raise)' chipCount 'to' chipCount;
forcedActionReason : '(' ~')'* ')';
showdownAction: 'Showdown' | 'Mucks';
winHighResult: chipCount 'with' handStrength (hand | handAndBoard);
winLowResult : chipCount (hand | handAndBoard);
loseResult   : 'lost with' handStrength (hand | handAndBoard);

// lexer rules
ME           : '[ME]';
STREET       : 'HOLE CARDS' | 'FLOP' | 'TURN' | 'RIVER' | 'SUMMARY';
FASTFOLD     : 'Zone Poker';
DEAD         : 'dead';
SIDEPOT      : 'Side pot';
COLON        : ':';
INT          : [0-9]+;
CARD         : [2-9TJQKA][cdhs];
WORD         : [A-Za-z]+;
EOL          : '\r' | '\n' | '\r\n';
WS           : [ \t]+ -> skip;
