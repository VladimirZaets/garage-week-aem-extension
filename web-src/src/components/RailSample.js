import { attach } from "@adobe/uix-guest"
import { useEffect, useState } from 'react'
import {ActionButton, ComboBox, Item, Provider, defaultTheme} from '@adobe/react-spectrum'

export default function  RailSample() {
  const [guestConnection, setGuestConnection] = useState(null);
  const [experiences, setExperiences] = useState(null);
  useEffect(() => {
    (async () => {
      let connection;
      connection = await attach({ id: "exchange-genstudio-claims-app-0" })
      setGuestConnection(connection);
    })()
  }, [])

  const getExperience = async () => {
    const remoteExperiences =await guestConnection.host.api.rightPanel.getExperiences();
    console.log(remoteExperiences);
    setExperiences(remoteExperiences);
  }
  const updateExperience = async () => {
    if (experiences) {
      const updatedExperiences = experiences.map(experience => {
        const updatedFields = { ...experience.fields, subject: 'Updated Subject' };
        return { ...experience, fields: updatedFields };
      });
      await guestConnection.host.api.rightPanel.updateExperience(updatedExperiences);
      setExperiences(updatedExperiences);
    }
  };

  return (
    <Provider theme={defaultTheme}>
      <div className={'dropdown-field-wrapper'}>
        Exchange Claims App
      </div>
      <div>
        <ActionButton variant="cta" onPress={getExperience} >Get Experience</ActionButton>
        {experiences && experiences.length > 0 && (
          <ActionButton variant="cta" onPress={updateExperience} >Update Experience</ActionButton>
        )}
      </div>
      <div>
        {experiences && experiences.length > 0 ? (
          <ul>
            {experiences.map((experience, index) => (
              <li key={index}>
                {Object.entries(experience.fields).map(([key, value]) => (
                  <p key={key}>{key}: {value}</p>
                ))}
              </li>
            ))}
          </ul>
        ) : (
          <p>Use Exchange Get experiences to see them</p>
        )}
      </div>
    </Provider>
  )
}
