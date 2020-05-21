// import { Action, createSelector, select, Store } from '@ngrx/store';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { filter, map, withLatestFrom } from 'rxjs/operators';
// import { ensureDefined } from '../assertions';
// import { withLatestState } from './withLatestState';

// describe('Dangerous behavior of withLatestFrom rxjs function', () => {
//   // These tests show why it's highly recommended not to use rxjs/withLatestFrom operator
//   // in the effects to combine data from the store.
//   //
//   // Workaround: use the custom withLatestState which doesn't create subscriptions
//   // fetches the data only when the action arrives.

//   interface ReservationItemModel {
//     id: string;
//     something?: { foo: boolean }; // some expandanle property of ReservationItemModel
//   }

//   interface State {
//     sharedReservationItem?: ReservationItemModel;
//   }

//   const getSharedItem = (state: State) => state.sharedReservationItem;

//   // extended selector (from the different module) that uses the shared selector,
//   // but it relies on `something` field that MUST be expanded
//   // when component in that module works with that selector (usually resolver should care about it).
//   const getReservation = createSelector(
//     getSharedItem,
//     item =>
//       item && {
//         ...item,
//         // a dangerouse place !!!
//         canAmend: ensureDefined(item.something).foo
//       }
//   );

//   class SomeEffect {
//     constructor(
//       private readonly actions$: Observable<Action>,
//       private readonly store$: Store<State>
//     ) {}

//     public readonly doSomethingBad = this.actions$
//       .pipe(
//         filter(action => action.type === 'ASSIGN_UNIT'),
//         // usage of the standard rxjs withLatestFrom function
//         // creates a subscribtion to store from very beginning which
//         // emit value EVERY time the store is changed. Despite the fact
//         // that we applyed filter for action type to the source observable.
//         withLatestFrom(this.store$.pipe(select(getReservation)))
//       )
//       .pipe(map(() => true));

//     public readonly doSomethingGood = this.actions$
//       .pipe(
//         filter(action => action.type === 'ASSIGN_UNIT'),
//         // custom implemetation that allows to avoid the weired behavior
//         withLatestState(this.store$, getReservation)
//       )
//       .pipe(map(([_, reservation]) => reservation));
//   }

//   it('get error with withLatestFrom', done => {
//     const actions = new Subject<Action>();
//     const store = new BehaviorSubject<State>({
//       sharedReservationItem: { id: 'XXXXXX1', something: { foo: true } }
//     });
//     // let's mock the effect
//     const effectInstance = new SomeEffect(actions, (store as unknown) as Store<State>);

//     effectInstance.doSomethingBad.subscribe(
//       () => {
//         // we should never get in here
//         expect(false).toBeTruthy();
//       },
//       error => {
//         // Uncomment to see the error details
//         // console.log('Error detected!', error);

//         expect(error).toBeDefined();
//         done();
//       }
//     );

//     // some other component in other module sets up the shared item for its puporse.....
//     // BAM! error should popup right after state is changed
//     store.next({
//       sharedReservationItem: { id: 'XXXXXX1' }
//     });
//   });

//   it('test withLatestState', done => {
//     const actions = new Subject<Action>();
//     const store = new BehaviorSubject<State>({
//       sharedReservationItem: { id: 'XXXXXX1', something: { foo: true } }
//     });
//     // let's mock the effect
//     const effectInstance = new SomeEffect(actions, (store as unknown) as Store<State>);

//     let flowIsFinished = false;

//     effectInstance.doSomethingGood.subscribe(
//       reservation => {
//         // We are here only afert we got ASSIGN_UNIT action
//         expect(flowIsFinished).toBeTruthy();
//         // and with the valid extended reservation model
//         expect(reservation).toBeDefined();
//         done();
//       },
//       () => {
//         // we should never get in here
//         expect(false).toBeTruthy();
//       }
//     );

//     store.next({
//       sharedReservationItem: { id: 'XXXXXX1' }
//     });

//     store.next({
//       sharedReservationItem: { id: 'XXXXXX1', something: { foo: true } }
//     });

//     flowIsFinished = true;

//     actions.next({
//       type: 'ASSIGN_UNIT'
//     });
//   });
// });
