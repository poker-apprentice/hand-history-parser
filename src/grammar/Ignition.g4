grammar Ignition;

// file entry
handHistory: line | ((line EOL)+ line);
line:
  ( lineMetaCash
  | lineMetaTournament
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
  | lineAwardBounty
  | lineTournamentPlacement
  | lineTournamentPrize
  );

// lines of text
lineMetaCash   : site 'hand' '#' handNumber fastFold? ('tbl' | 'id') '#' tableNumber variant bettingStructure '-' timestamp;
lineMetaTournament: site 'hand' '#' handNumber COLON variant 'tournament' '#' tournamentNumber 'tbl' '#' tableNumber ',' tournamentSpeed? '-' 'level' tournamentLevel '(' chipCount '/' chipCount ')' '-' timestamp;
linePlayer     : 'seat' seatNumber COLON position ME? '(' chipCount 'in chips)';
lineDealer     : ('dealer' ME? COLON)? 'set dealer' ('[' INT ']')?;
lineSmallBlind : ('small blind' | 'dealer') ME? COLON 'small blind' chipCount;
lineBigBlind   : 'big blind' ME? COLON 'big blind' chipCount;
linePost       : position ME? COLON 'posts' DEAD? 'chip' chipCount;
lineStreet     : '***' STREET '***' boardSections?;
lineHandsDealt : position ME? COLON 'card dealt to a spot' hand;
lineAwardBounty: position ME? COLON 'bounty prize' '[' chipCount ']';
lineTournamentPlacement: position ME? COLON 'ranking' tournamentPlacement;
lineTournamentPrize: position ME? COLON 'prize' (tournamentPrizeCash | tournamentPrizeTicket);
lineMisc       :
  (position ME? COLON)?
  (
    'table deposit' chipCount
    | 'seat sit down'
    | 'seat sit out'
    | 'seat stand'
    | 'seat re-join'
    | 're-join'
    | 'table enter user'
    | 'table leave user'
    | 'stand'
    | 'sit out'
    | 'sitout' forcedActionReason
    | 'enter' forcedActionReason
    | 'leave' forcedActionReason
    | 'draw for dealer' board
  );
lineAction     : position ME? COLON action;
lineMuck       : position ME? COLON 'does not show' hand '(' handStrength ')';
lineUncalled   : position ME? COLON 'return uncalled portion of bet' chipCount;
lineShowdown   : position ME? COLON showdownAction  hand? '(' handStrength ')';
lineResult     : position ME? COLON 'hand result' ('-' SIDEPOT)? chipCount;
lineTotalPot   : 'total pot' '(' chipCount ')';
lineBoard      : 'board' board;
lineActionSummary:
  'seat' '+'? INT COLON position
  (
    'folded' ('before' | 'on') 'the' STREET
    | 'hi'? chipCount? '[does not show]'
    | '[mucked]' hand
    | winHighResult bountyAwardResult?
    | 'hi' winHighResult ('lo' winLowResult)? bountyAwardResult?
    | 'lo' winLowResult bountyAwardResult?
    | loseResult
  );

// parser rules
handNumber   : INT;
seatNumber   : INT;
tableNumber  : INT;
tournamentNumber: INT;
tournamentLevel: INT;
tournamentSpeed: 'normal' | 'turbo';
tournamentPlacement: INT;
tournamentPrizeCash: chipCount;
tournamentPrizeTicket: 'tournament ticket' '[' WORD* chipCount WORD* ']';
timestamp    : INT '-' INT '-' INT INT ':' INT ':' INT;
site         : 'bodog' | 'bovada' | 'ignition';
variant      : 'holdem' | 'omaha' | 'omaha hilo' | 'holdemzonepoker' | 'omahazonepoker';
bettingStructure : 'no limit' | 'pot limit' | 'limit';
fastFold     : FASTFOLD;
position     : 'small blind' | 'big blind' | 'utg' | ('utg+' INT) | 'dealer';
chipCount    : '$'? value;
value        : (INT ',')* INT ('.' INT)?;
board        : '[' cards ']';
boardSections : board+;
hand         : '[' cards ']';
handAndBoard : '[' cards '-' cards ']';
cards        : card+;
card         : CARD;
handStrength : 'high card' | 'one pair' | 'two pair' | 'three of a kind' | 'straight' | 'flush' | 'full house' | 'four of a kind' | 'straight flush' | 'royal straight flush';
action       : actionFold | actionCheck | actionBet | actionCall | actionRaise | actionAllInRaise | actionAllIn | actionAnte;
actionFold   : ('fold' | 'folds') (forcedActionReason | '& shows' hand)?;
actionCheck  : 'checks' forcedActionReason?;
actionBet    : 'bets' forcedActionReason? chipCount;
actionCall   : ('call' | 'calls') forcedActionReason? chipCount;
actionRaise  : 'raises' forcedActionReason? chipCount 'to' chipCount;
actionAllIn  : 'all-in' forcedActionReason? chipCount;
actionAllInRaise : 'all-in' '(raise)' forcedActionReason? chipCount 'to' chipCount;
actionAnte   : 'ante chip' chipCount;
forcedActionReason : '(' ~')'* ')';
showdownAction: 'showdown' | 'mucks';
winHighResult: chipCount 'with' handStrength (hand | handAndBoard);
winLowResult : chipCount (hand | handAndBoard);
loseResult   : ('lose with' | 'lost with') handStrength (hand | handAndBoard);
bountyAwardResult: 'bounty awarded' COLON chipCount;

// lexer rules
ME           : '[me]';
STREET       : 'hole cards' | 'flop' | 'turn' | 'river' | 'summary';
FASTFOLD     : 'zone poker';
DEAD         : 'dead';
SIDEPOT      : 'side pot';
COLON        : ':';
INT          : [0-9]+;
CARD         : [2-9tjqka][cdhs];
WORD         : [a-z]+;
EOL          : '\r' | '\n' | '\r\n';
WS           : [ \t]+ -> skip;
