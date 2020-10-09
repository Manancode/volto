import React from 'react';
import { Label, Grid, Button, Dropdown } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { settings } from '~/config';
const messages = defineMessages({
  compare_to: {
    id: 'compare_to',
    defaultMessage: 'Compare to',
  },
});

const CompareLanguages = ({
  content,
  visual,
  comparingLanguage,
  setComparingLanguage,
}) => {
  const intl = useIntl();

  const translations = settings.isMultilingual
    ? content?.['@components']?.translations?.items || []
    : [];

  const compareOptions = translations.map((t) => {
    return {
      key: t.language,
      text: t.language,
      value: t.language,
    };
  });

  return settings.isMultilingual ? (
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          <Label ribbon>{content.language?.token.toUpperCase()}</Label>
        </Grid.Column>
        <Grid.Column width={6} textAlign="right">
          {compareOptions.length > 0 && (
            <Dropdown
              button
              options={compareOptions}
              value={comparingLanguage}
              text={`${intl.formatMessage(messages.compare_to)} ${
                comparingLanguage ? comparingLanguage.toUpperCase() : '...'
              }`}
              onChange={(e, { value }) => {
                setComparingLanguage(value);
              }}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : null;
};

export default CompareLanguages;
