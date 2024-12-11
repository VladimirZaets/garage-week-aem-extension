/*
* <license header>
*/

/* global fetch */

import allActions from './config.json'


export const getActionUrl = (action) => {
  return allActions[action]
}

/**
 *
 * Invokes a web action
 *
 * @param  {string} actionUrl
 * @param {object} headers
 * @param  {object} params
 *
 * @returns {Promise<string|object>} the response
 *
 */



export async function actionWebInvoke (actionUrl, authToken, params = {}, options = { method: 'POST' }) {
  const actionHeaders = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${authToken}`
  }

  const fetchConfig = {
    headers: actionHeaders
  }

  if (window.location.hostname === 'localhost') {
    actionHeaders['x-ow-extra-logging'] = 'on'
  }

  fetchConfig.method = options.method.toUpperCase()

  if (fetchConfig.method === 'GET') {
    actionUrl = new URL(actionUrl)
    Object.keys(params).forEach(key => actionUrl.searchParams.append(key, params[key]))
  } else if (fetchConfig.method === 'POST') {
    fetchConfig.body = JSON.stringify(params)
  }

  const resp = await fetch(actionUrl, fetchConfig)
  if (!resp.ok) {
    throw new Error(
      'Request to ' + actionUrl + ' failed with status code ' + resp.status
    )
  }

  const data = await resp.json()
  return data
}


export const getModelsList = async (authToken, aemHost, imsOrg, searchParams) => {
  return await actionWebInvoke(getActionUrl("get-models-list"), authToken, {
    aemHost: `https://${aemHost}`,
    imsOrg,
    searchParams
  });
}

export const createContentFragment = async (authToken, aemHost, imsOrg, data) => {
  return await actionWebInvoke(getActionUrl("create-content-fragment"), authToken, {
    aemHost: `https://${aemHost}`,
    imsOrg,
    body: data
  });
}

export const getContentFragmentByModelFilter = async (authToken, aemHost, imsOrg, modelId, searchParams) => {
  return await actionWebInvoke(getActionUrl("get-content-fragments-by-model-filter"), authToken, {
    aemHost: `https://${aemHost}`,
    imsOrg,
    modelId,
  });
}

export const getContentFragmentByModel = async (authToken, aemHost, imsOrg, modelId, searchParams) => {
  const filter = JSON.stringify({
    filter: {
      fullText: {
        queryMode: "EXACT_WORDS"
      },
      modelIds: [modelId]
    }
  });

  const params = searchParams ? {
    ...searchParams,
    query: filter,
  } : {
    query: filter
  }

  return await actionWebInvoke(getActionUrl("get-content-fragments-by-model"), authToken, {
    aemHost: `https://${aemHost}`,
    imsOrg,
    params
  });
}
