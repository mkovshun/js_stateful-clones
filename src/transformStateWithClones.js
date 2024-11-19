'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const temp = { ...state };
  const transformedState = [];

  for (const keys in actions) {
    const obj = actions[keys];

    if (obj.type === 'addProperties') {
      Object.assign(temp, obj.extraData);
      transformedState.push({ ...temp });
    }

    if (obj.type === 'removeProperties') {
      for (const param of obj.keysToRemove) {
        delete temp[param];
      }
      transformedState.push({ ...temp });
    }

    if (obj.type === 'clear') {
      for (const key in temp) {
        delete temp[key];
      }
      transformedState.push({ ...temp });
    }
  }

  return transformedState;
}

module.exports = transformStateWithClones;
