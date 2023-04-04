import React from 'react';
import deepmerge from 'deepmerge';
import { obj as utilsCheckObj } from '@nest-datum-utils/check';

const Route = React.createContext({});

function create(inputData = {}) {
	return function createRouteContext(mergeData = {}) {
		if (!utilsCheckObj(inputData)) {
			throw new Error(`Property "inputData" is not an object in createRouteConfig function. Got: ${(typeof inputData)}.`);
		}
		if (mergeData && !utilsCheckObj(inputData)) {
			throw new Error(`Property "mergeData" is not an object in createRouteConfig function. Got: ${(typeof mergeData)}.`);
		}
		return deepmerge(inputData, mergeData);
	}
}

export default Route;
export {
	create,
};
