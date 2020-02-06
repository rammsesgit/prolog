export const sweet_home_alabama_test = `
/** 
 *  Isar Ramses Cadena Gaona
 *  N° 14050661
 */

:-dynamic connection/2.
:-dynamic closed/2.
:-dynamic here/1.
:-dynamic have/1.
:-dynamic key/2.
:-dynamic location/2.
:-dynamic object/4.
:-dynamic respond/1.
:-dynamic respond/3.
:-dynamic turned_off/1.
:-dynamic turned_on/1.

/** Rooms */
room(stairs).
% upstairs
room('parents bedroom').
room('upstairs bathroom').
room(bedroom).
room('brothers bedroom').
room('upstairs hall').
room(office).
% downstairs
room('living room').
room('dinning room').
room(kitchen).
room('downstairs hall').
room('downstairs bathroom').

/** Doors */
door('upstairs hall', 'parents bedroom').
door('upstairs hall', 'upstairs bathroom').
door('upstairs hall', bedroom).
door('upstairs hall', 'brothers bedroom').
door('upstairs hall', stairs).
door('upstairs hall', office).
door('downstairs hall', 'living room').
door('downstairs hall', 'dinning room').
door('downstairs hall', kitchen).
door('downstairs hall', stairs).
door('downstairs hall', 'downstairs bathroom').

/** Parents bedroom locations */
location(bed,'parents bedroom').
location(nighttable,'parents bedroom').
location(closet,'parents bedroom').

/** Upstairs bathroom locations*/
location(toilet,'upstairs bathroom').
location(sink,'upstairs bathroom').
location('body towel','upstairs bathroom').
location(shower,'upstairs bathroom').

/** Bedroom locations */
location(bed,'bedroom').
location(nighttable,'bedroom').
location(closet,'bedroom').

/** Brothers bedroom locations */
location(bed,'brothers bedroom').
location(nighttable,'brothers bedroom').
location(closet,'brothers bedroom').
location(brownie,'brothers bedroom').

/** Upstairs hall locations */
location('flower pot','upstairs hall').

/** Office locations */
location('gamer computer',office).
location('gamer chair',office).
location(desk,office).
location(bookshelf,office).
location('dirty dishes',office).
location('dirty glasses',office).

/** Stairs locations */
location('portrait','stairs').

/** Living room locations */
location(armchair,'living room').
location(couch,'living room').
location(television,'living room').
location(vase,'living room').

/** Dinning room locations */
location('big table','dinning room').
location('fruit platter','dinning room').
location(television,'dinning room').
location(chairs,'dinning room').
location('old banana', 'dinning room').
location('dirty glasses','dinning room').

/** Kitchen locations */
% furniture
location(fridge, kitchen).
location(stove,kitchen).
location(sink,kitchen).
location(cupboard,kitchen).
% food
location(cookie,kitchen).
location('apple juice',kitchen).
location('pineapple juice',kitchen).
% other
location('office key',kitchen).

/** Downstairs hall locations */
location('flower pot','downstairs hall').

/** Downstair bathroom locations */
location(toilet,'downstairs bathroom').
location(sink,'downstairs bathroom').
location('hand towel','downstairs bathroom').

/** Lights */
turned_off('parents bedroom').
turned_off('upstairs bathroom').
turned_off('brothers bedroom').
turned_off('upstairs hall').
turned_off('downstairs hall').
turned_off('downstairs bathroom').
turned_off(stairs).
turned_on(bedroom).
turned_on(office).
turned_on('living room').
turned_on('dinning room').
turned_on(kitchen).

/** Closed-opened door */
closed('upstairs hall', office).
closed('upstairs hall', 'brothers bedroom').
opened('upstairs hall', 'parents bedroom').
opened('upstairs hall', 'upstairs bathroom').
opened('upstairs hall', bedroom).
opened('upstairs hall', stairs).
opened('downstairs hall', 'living room').
opened('downstairs hall', 'dinning room').
opened('downstairs hall', kitchen).
opened('downstairs hall', stairs).
opened('downstairs hall', 'downstairs bathroom').

/** Food */
edible(cookie).
edible(brownie).
drinkable('apple juice').
drinkable('pineapple juice').
tastes_yucky('old banana').

/** Breakable things */
breakable(computer).
breakable(vase).
breakable('flower pot').

/** Starting place */
here(bedroom).

/** Look objects in the room */
look :-
    here(Room),
    turned_on(Room),
    tab(2), format('﫷 You are in: ~w', [Room]), nl, nl,
    tab(2), write('  You can see: '), nl, list_things(Room), nl,
    tab(2), write('  You can go to: '), nl, list_connections(Room), nl,
    tab(2), write('ﴙ Closed doors:'), nl, list_closed(Room), !.
look:- write('  Its very dark'), nl, nl, write('').

/** Lists */
list_things(Room):-
    is_contained_in(X,Room),
    tab(2), format('- ~w', X), nl, fail.
list_things(_).

list_connections(Room):-
    connection(Room,X),
    tab(2), format('- ~w', X), nl, fail.
list_connections(_).

list_closed(Room):-
    check_closed(X,Room),
    tab(2), format('- ~w', X), nl, fail.
list_closed(_).

is_contained_in(T1,T2):- location(T1,T2).

check_open(X,Y):- opened(X,Y).
check_open(X,Y):- opened(Y,X).
connection(X,Y):- door(X,Y).
connection(X,Y):- door(Y,X).
check_closed(X,Y):- closed(X,Y).
check_closed(X,Y):- closed(Y,X).

/** Actions */
cls :- write('\e[H\e[2J'), !.

goto(Place) :-
    can_go(Place),
    retract(here(_)),
    asserta(here(Place)),
    cls, format('You moved to the ~w', [Place]), nl, nl, look, !.

can_go(To) :-
    here(From),
    connection(To, From),
    not(closed(From, To)).
can_go(Place) :-
    here(X),
    not(connection(Place, X)),
    format('ﰸ You cant get to ~w', [Place]), write(' from here.'), fail.
can_go(Place) :-
    here(X),
    closed(X, Place),
    write('The door is locked ﴙ'), nl,
    write('You shall no pass!!! '), nl, nl,
    write('You need a key '), fail.

/** Take */
take(Object):-
    can_take(Object),
    take_object(Object), !.

take('office key'):-
    can_take('office key'),
    here(Room),
    location('office key',Room),
    retract(location('office key',Room)),
    assert(key('office key',office)),
    write('You took office key '), !.

take_object(Object):-
    here(Room),
    retract(location(Object,Room)),
    assert(have(Object)),
    write(' Taken.'), !.

can_take(Object):-
    here(Room),
    location(Object,Room), !.
can_take(Object):-
    format('There is no ~w', [Object]), write(' here. '), fail.

/** Put */
put(Object):-
    can_put(Object).
can_put(Object):-
    have(Object),
    here(X),
    retract(have(Object)),
    assert(location(Object,X)),
    write('  Put.'), !.
can_put(Object):-
    format('You dont have ~w', [Object]), write(' to put here ﰸ'),fail.

/** Unlock */
unlock(To) :-
    To = office,
    have('office key'),
    unlock_door(To), !.
unlock(_) :- write('You need a key for that'), nl, fail.

unlock_door(To) :-
    here(Where),
    retract(closed(Where, To)),
    format('  You unlocked the door from the ~w', [Where]),
    format(' to the ~w', [To]), !.

/** Drop */
drop(Object):-
    have(Object),
    can_drop(Object),
    drop_object(Object), !.
drop(Object):-
    format('You dont have ~w', [Object]), write(' to put here ﰸ'), fail.

can_drop(Object):-
    breakable(Object), !.
can_drop(Object):-
    put(Object), fail.

drop_object(Object):-
    retract(have(Object)),
    format('The ~w', [Object]), write(' broke. ').

/** See inventory */
inventory:-
    have(Object),
    tab(2), write(Object), nl, fail.
inventory:- have(_), !.
inventory:- write('Without inventory '), fail.

/** Eat */
eat(Object):-
    here(Room),
    edible(Object),
    retract(location(Object,Room)),
    write(' Eaten.'), !.
eat(Object):-
    tastes_yucky(Object),
    format('This ~w', [Object]),
    write(' doesnt look appetizing. ﮙ'),!.
eat(Object):-
    write('﫲 You cant eat that '),
    write(Object), fail.

/** Drink */
drink(Object):-
    here(Room),
    drinkable(Object),
    retract(location(Object,Room)),
    write('ﮚ Drinken'), !.
drink(Object):-
    tastes_yucky(Object),
    write(Object),
    write(' doesnt look appetizing. ﮙ'), !.
drink(Object):-
    write('﫲 You cant drink that '),
    write(Object), fail.

/** Lights */
turn_on :-
    here(Where),
    Where = 'brothers bedroom',
    write('The light wont turn on. '),
    !.
turn_on :-
    here(Where),
    turned_off(Where),
    retract(turned_off(Where)),
    asserta(turned_on(Where)),
    write('You turned on the light. ﯦ'),
    !.
turn_on :-
    write('The light is already on. ﯦ').

turn_off :-
    here(Where),
    turned_on(Where),
    retract(turned_on(Where)),
    asserta(turned_off(Where)),
    write('You turned off the light. '),
    !.
turn_off :-
    write('The light is already off. ').
`
