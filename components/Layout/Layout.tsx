import React from "react";
import {
  AppShell,
  Navbar,
  Box,
  Text,
  ActionIcon,
  Group,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSettings, IconSun, IconMoonStars } from "@tabler/icons-react";
import MainLinks from "./MainLinks";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} p="xs">
          <Navbar.Section mt="xs">
            <Box
              sx={(theme) => ({
                paddingLeft: theme.spacing.xs,
                paddingRight: theme.spacing.xs,
                paddingBottom: theme.spacing.lg,
                borderBottom: `${rem(1)} solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
                }`,
              })}
            >
              <Group position="apart">
                <Text
                  fz="xl"
                  fw={700}
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.gray[0]
                        : theme.colors.dark[9],
                  })}
                >
                  PentaJam
                </Text>
                <Group spacing="xs">
                  <ActionIcon size="sm" variant="default">
                    <IconSettings />
                  </ActionIcon>
                  <ActionIcon
                    variant="default"
                    onClick={() => toggleColorScheme()}
                    size="sm"
                  >
                    {colorScheme === "dark" ? (
                      <IconSun size="1rem" />
                    ) : (
                      <IconMoonStars size="1rem" />
                    )}
                  </ActionIcon>
                </Group>
              </Group>
            </Box>
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
