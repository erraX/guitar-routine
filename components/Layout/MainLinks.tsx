import React from "react";
import Link from "next/link";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { IconActivity, IconPackage, IconAtom } from "@tabler/icons-react";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <Link href={link}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const data = [
  {
    icon: <IconAtom size="1rem" />,
    color: "blue",
    label: "TRAINER",
    link: "/trainer",
  },
  {
    icon: <IconPackage size="1rem" />,
    color: "teal",
    label: "EXERCISES",
    link: "/exercise",
  },
  {
    icon: <IconActivity size="1rem" />,
    color: "grape",
    label: "HISTORY",
    link: "/history",
  },
];

function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

export default MainLinks;
