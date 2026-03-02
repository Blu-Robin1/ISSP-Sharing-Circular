import { observer } from 'mobx-react';
import type { ThemeWithName } from 'oa-themes';
import { Link } from 'react-router';
import { VERSION } from 'src/config/config';
import { Box, Flex, Image, Text, useThemeUI } from 'theme-ui';

const Logo = observer(() => {
  const themeUi = useThemeUI();
  const theme = themeUi.theme as ThemeWithName;

  const name = import.meta.env.VITE_SITE_NAME || process.env.VITE_SITE_NAME;
  const logo = theme.logo;

  const nameAndVersion = `${name} logo ${VERSION}`;

  // Slightly reduced size
  const logoBoxHeight = ['60px', '65px', '70px'];
  const logoBoxWidth = ['220px', '240px', '260px'];

  return (
    <Box
      sx={{
        py: [2, 2, 2], // slightly tighter vertical spacing
        position: 'relative',
      }}
    >
      <Link to="/">
        <Flex
          ml={[0, 4]}
          sx={{
            alignItems: 'center',
            width: logoBoxWidth,
            height: logoBoxHeight,
          }}
        >
          <Image
            loading="lazy"
            src={logo}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
            alt={nameAndVersion}
            title={nameAndVersion}
          />
        </Flex>

        <Text
          className="sr-only"
          ml={2}
          sx={{ display: ['none', 'none', 'block'] }}
          color="black"
        >
          {name}
        </Text>
      </Link>
    </Box>
  );
});

export default Logo;



// import { observer } from 'mobx-react';
// import type { ThemeWithName } from 'oa-themes';
// import { Link } from 'react-router';
// import { VERSION } from 'src/config/config';
// import { Box, Flex, Image, Text, useThemeUI } from 'theme-ui';

// const Logo = observer(() => {
//   const themeUi = useThemeUI();
//   const theme = themeUi.theme as ThemeWithName;

//   const name = import.meta.env.VITE_SITE_NAME || process.env.VITE_SITE_NAME;
//   const logo = theme.logo;

//   const nameAndVersion = `${name} logo ${VERSION}`;

//   const logoBoxWidth = ['260px', '300px', '340px'];
//   const logoBoxHeight = ['70px', '80px', '90px'];


//   return (
//     <Box
//       sx={{
//         py: [2, 2, 0], // padding on y axes ( top & bottom )
//         marginBottom: [0, 0, '-50px'],
//         position: 'relative',
//       }}
//     >
//       <Link to="/">
//         <Flex
//           ml={[0, 4]}
//           sx={{
//             zIndex: 1000,
//             display: 'flex',
//             alignItems: 'center',
//             width: logoBoxWidth,
//             height: logoBoxHeight,
//           }}
//         >
//           <Image
//             loading="lazy"
//             src={logo}
//             style={{ maxWidth: 100, maxHeight: 100 }}
//             sx={{
//               width: '100%',
//               height: '100%',
//               // maxHeight: '60px',
//               objectFit: 'contain',
//               display: 'block',
//             }}
//             alt={nameAndVersion}
//             title={nameAndVersion}
//           />
//         </Flex>
//         <Text className="sr-only" ml={2} sx={{ display: ['none', 'none', 'block'] }} color="black">
//           {name}
//         </Text>
//       </Link>
//     </Box>
//   );
// });

// export default Logo;
