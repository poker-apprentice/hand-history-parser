grammar Site;

/**
 * When new sites are added, include them here as a possible parsing path.
 * (e.g.: `site: siteBovada | siteGG | sitePokerStars`)
 */
site: siteBovada;

/**
 * These lines must remain in sync with the `lineMeta` definition found in each of the individual
 * site grammar files.
 */
siteBovada: bovadaSite 'Hand' '#' INT bovadaFastFold? ('TBL#' | 'ID#') INT bovadaVariant bovadaBettingStructure '-' bovadaTimestamp;

// lexer rules for individual sites & networks
bovadaSite: 'Bodog' | 'Bovada' | 'Ignition';
bovadaFastFold: 'Zone Poker';
bovadaVariant: 'HOLDEM' | 'OMAHA' | 'HOLDEMZonePoker' | 'OMAHAZonePoker';
bovadaBettingStructure: 'No Limit' | 'Pot Limit' | 'Limit';
bovadaTimestamp: INT '-' INT '-' INT INT ':' INT ':' INT;

// lexer rules
INT: [0-9]+;
WS: [ \t]+ -> skip;
