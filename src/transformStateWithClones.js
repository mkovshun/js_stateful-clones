'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const transformedState = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(stateCopy, action.extraData);
        transformedState.push({ ...stateCopy });
        break;

      case action.type === 'removeProperties':
        for (const param of action.keysToRemove) {
          delete stateCopy[param];
        }
        transformedState.push({ ...stateCopy });
        break;

      case action.type === 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        transformedState.push({ ...stateCopy });
        break;
    }
  }

  return transformedState;
}

module.exports = transformStateWithClones;
