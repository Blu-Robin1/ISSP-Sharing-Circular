import { observer } from 'mobx-react';
import { FieldInput, FieldTextarea, Username } from 'oa-components';
import type { ProfileFormData } from 'oa-shared';
import { Field } from 'react-final-form';
import { SelectField } from 'src/common/Form/Select.field';
import { fields, headings } from 'src/pages/UserSettings/labels';
import { useProfileStore } from 'src/stores/Profile/profile.store';
import { required, validateUrl } from 'src/utils/validators';
import { Flex, Heading, Text } from 'theme-ui';
import {
  GROUP_PROFILE_DESCRIPTION_MAX_LENGTH,
  MEMBER_PROFILE_DESCRIPTION_MAX_LENGTH,
} from '../../constants';
import { ProfileSection } from '../elements';

const BC_CITIES = [
  'Abbotsford',
  'Armstrong',
  'Burnaby',
  'Campbell River',
  'Castlegar',
  'Chilliwack',
  'Colwood',
  'Coquitlam',
  'Courtenay',
  'Cranbrook',
  'Dawson Creek',
  'Delta',
  'Duncan',
  'Enderby',
  'Fernie',
  'Fort St. John',
  'Grand Forks',
  'Greenwood',
  'Kamloops',
  'Kelowna',
  'Kimberley',
  'Langford',
  'Langley',
  'Maple Ridge',
  'Merritt',
  'Nanaimo',
  'Nelson',
  'New Westminster',
  'North Vancouver',
  'Parksville',
  'Penticton',
  'Pitt Meadows',
  'Port Alberni',
  'Port Coquitlam',
  'Port Moody',
  'Powell River',
  'Prince George',
  'Prince Rupert',
  'Quesnel',
  'Revelstoke',
  'Richmond',
  'Rossland',
  'Salmon Arm',
  'Surrey',
  'Terrace',
  'Trail',
  'Vancouver',
  'Vernon',
  'Victoria',
  'West Kelowna',
  'White Rock',
  'Williams Lake',
];

const cityOptions = BC_CITIES.map((city) => ({
  label: city,
  value: city,
}));

interface IProps {
  formValues: Partial<ProfileFormData>;
}

export const UserInfosSection = observer(({ formValues }: IProps) => {
  const { profile } = useProfileStore();

  const isMemberProfile = !profile?.type?.isSpace;
  const { about, country, displayName, userName, website } = fields;

  return (
    <ProfileSection>
      <Flex data-testid="UserInfosSection" sx={{ flexDirection: 'column', gap: [3, 5] }}>
        <Heading as="h2">{headings.infos}</Heading>

        <Flex sx={{ flexDirection: 'column', gap: 1 }}>
          <Text>
            {userName.title} <Text color="red">*</Text>
          </Text>
          <Text variant="quiet" sx={{ fontSize: 2 }}>
            {userName.description}
          </Text>
          <Field
            data-cy="userName"
            name="userName"
            component={FieldInput}
            validate={required}
            validateFields={[]}
            disabled
          />
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 1 }}>
          <Text>
            {displayName.title} <Text color="red">*</Text>
          </Text>
          <Text variant="quiet" sx={{ fontSize: 2 }}>
            {displayName.description}
          </Text>
          <Field
            data-cy="displayName"
            name="displayName"
            component={FieldInput}
            validate={required}
            validateFields={[]}
          />
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 1 }}>
          <Text>{about.title}</Text>
          <Field
            data-cy="info-about"
            name="about"
            component={FieldTextarea}
            showCharacterCount
            maxLength={
              isMemberProfile
                ? MEMBER_PROFILE_DESCRIPTION_MAX_LENGTH
                : GROUP_PROFILE_DESCRIPTION_MAX_LENGTH
            }
            placeholder={about.placeholder}
            validateFields={[]}
          />
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 1 }}>
          <Text>{country.title} <Text color="red">*</Text></Text>
          <Field data-cy="country-dropdown" name="country">
            {(field) => (
              <SelectField
                options={cityOptions}
                placeholder="Select your city..."
                {...field}
              />
            )}
          </Field>

          <Flex sx={{ gap: 1, alignItems: 'center' }}>
            <Text sx={{ fontSize: 1 }} variant="quiet">
              Preview:
            </Text>
            {profile?.username && (
              <Username
                user={{
                  ...profile,
                  country: formValues.country,
                }}
              />
            )}
          </Flex>
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 1 }}>
          <Text>{website.title}</Text>
          <Field
            data-cy="website"
            name="website"
            component={FieldInput}
            placeholder="https://"
            validate={validateUrl}
            validateFields={[]}
          />
        </Flex>
      </Flex>
    </ProfileSection>
  );
});



// import { getCountryDataList, getEmojiFlag } from 'countries-list';
// import { observer } from 'mobx-react';
// import { FieldInput, FieldTextarea, Username } from 'oa-components';
// import type { ProfileFormData } from 'oa-shared';
// import { Field } from 'react-final-form';
// import { SelectField } from 'src/common/Form/Select.field';
// import { fields, headings } from 'src/pages/UserSettings/labels';
// import { useProfileStore } from 'src/stores/Profile/profile.store';
// import { required, validateUrl } from 'src/utils/validators';
// import { Flex, Heading, Text } from 'theme-ui';
// import {
//   GROUP_PROFILE_DESCRIPTION_MAX_LENGTH,
//   MEMBER_PROFILE_DESCRIPTION_MAX_LENGTH,
// } from '../../constants';
// import { ProfileSection } from '../elements';

// const countryOptions = getCountryDataList().map((country) => ({
//   label: `${getEmojiFlag(country.iso2)} ${country.native}`,
//   value: country.iso2,
// }));

// interface IProps {
//   formValues: Partial<ProfileFormData>;
// }

// export const UserInfosSection = observer(({ formValues }: IProps) => {
//   const { profile } = useProfileStore();

//   const isMemberProfile = !profile?.type?.isSpace;
//   const { about, country, displayName, userName, website } = fields;

//   return (
//     <ProfileSection>
//       <Flex data-testid="UserInfosSection" sx={{ flexDirection: 'column', gap: [3, 5] }}>
//         <Heading as="h2">{headings.infos}</Heading>

//         <Flex sx={{ flexDirection: 'column', gap: 1 }}>
//           <Text>
//             {userName.title} <Text color="red">*</Text>
//           </Text>
//           <Text variant="quiet" sx={{ fontSize: 2 }}>
//             {userName.description}
//           </Text>
//           <Field
//             data-cy="userName"
//             name="userName"
//             component={FieldInput}
//             validate={required}
//             validateFields={[]}
//             disabled
//           />
//         </Flex>

//         <Flex sx={{ flexDirection: 'column', gap: 1 }}>
//           <Text>
//             {displayName.title} <Text color="red">*</Text>
//           </Text>
//           <Text variant="quiet" sx={{ fontSize: 2 }}>
//             {displayName.description}
//           </Text>
//           <Field
//             data-cy="displayName"
//             name="displayName"
//             component={FieldInput}
//             validate={required}
//             validateFields={[]}
//           />
//         </Flex>

//         <Flex sx={{ flexDirection: 'column', gap: 1 }}>
//           <Text>
//             {about.title}
//           </Text>
//           <Field
//             data-cy="info-about"
//             name="about"
//             component={FieldTextarea}
//             showCharacterCount
//             maxLength={
//               isMemberProfile
//                 ? MEMBER_PROFILE_DESCRIPTION_MAX_LENGTH
//                 : GROUP_PROFILE_DESCRIPTION_MAX_LENGTH
//             }
//             placeholder={about.placeholder}
//             validateFields={[]}
//           />
//         </Flex>

//         <Flex sx={{ flexDirection: 'column', gap: 1 }}>
//           <Text>{country.title}</Text>
//           <Field data-cy="country-dropdown" name="country">
//             {(field) => (
//               <SelectField
//                 options={countryOptions}
//                 placeholder="Select your country..."
//                 {...field}
//               />
//             )}
//           </Field>
//           <Flex sx={{ gap: 1, alignItems: 'center' }}>
//             <Text sx={{ fontSize: 1 }} variant="quiet">
//               Preview:
//             </Text>
//             {profile?.username && (
//               <Username
//                 user={{
//                   ...profile,
//                   country: formValues.country,
//                 }}
//               />
//             )}
//           </Flex>
//         </Flex>

//         <Flex sx={{ flexDirection: 'column', gap: 1 }}>
//           <Text>{website.title}</Text>
//           <Field
//             data-cy="website"
//             name="website"
//             component={FieldInput}
//             placeholder="https://"
//             validate={validateUrl}
//             validateFields={[]}
//           />
//         </Flex>
//       </Flex>
//     </ProfileSection>
//   );
// });
