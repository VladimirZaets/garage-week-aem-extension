/*
 * <license header>
 */

import React from 'react';
import { Button, Provider, defaultTheme, Flex, View, Heading, Divider, Picker, Item, CheckboxGroup, Checkbox } from '@adobe/react-spectrum';
import { attach } from "@adobe/uix-guest"
import { useEffect, useState } from 'react'
import { getModelsList } from '../utils';

export const CLAIMS = [
  "Durable Skin Clearance: PASI 90 response was achieved at Week 24. Response rates observed up to ~4 years",
  "SKYRIZI met its primary endpoint (ACR20 at Week 24) in 2 clinical trials. ACR50/70, complete resolution of enthesitis/dactylitis and its minimal disease activity were achieved at Week 24. Response rates sustained at ~4 years",
  "Sustained Joint Efficacy must be in direct conjunction to ACR 20 at Week 24"
];

export default function ClaimsList() {

  const [guestConnection, setGuestConnection] = useState(null);
  const [selectedClaims, setSelectedClaims] = useState([]);



  useEffect(() => {
    (async () => {
      let connection;
      connection = await attach({ id: "exchange-genstudio-claims-app-0" })
      setGuestConnection(connection);
      //Example of auth data
      // apiKey: "aem-headless-cf-editor"
      // authScheme: "Bearer"
      // imsOrg: "<orgID>"
      // imsOrgName: "<orgName>"
      // imsToken:"<token"

      //getModelsList = async (authToken, aemHost, imsOrg, searchParams) => {
      const auth = connection.sharedContext.get("auth");
      const host = connection.sharedContext.get("aemHost");
      console.log("authauthauthauth", auth, host, connection.sharedContext);
      //await getModelsList();
    })()
  }, [])

  const onClaimSelect = async () => {
    await guestConnection.host.api.sendToGs(selectedClaims);
  }

  return (
    <Provider theme={defaultTheme}>
      <View padding="size-200">
        <Heading level={2}>Select a claim library33</Heading>
        <Picker label="Claim Library1" placeholder="Select a library33">
          <Item key="library6">Library 6</Item>
          <Item key="library7">Library 7</Item>
          <Item key="library8">Library 8</Item>
        </Picker>
        <Divider size="S" marginY="size-200" />
        <CheckboxGroup label="Select Claims33" value={selectedClaims} onChange={setSelectedClaims}>
          {CLAIMS.map(claim => (
            <Checkbox key={claim} value={claim}>{claim}</Checkbox>
          ))}
        </CheckboxGroup>
        <Flex direction="row" gap="size-200" justifySelf="end">
          <Button variant="primary" onPress={onClaimSelect}>
            Select
          </Button>
        </Flex>
      </View>
    </Provider>
  );
}
