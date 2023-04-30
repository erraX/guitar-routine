import { FC } from 'react';
import Link from 'next/link';
import { Button, Text } from '@geist-ui/core';
import styles from './Navbar.module.css';

const Navbar: FC = () => {
	return (
		<div className={styles.navbar}>
			<Text h3 className={styles.title}>Guitar</Text>
			<Link href="/trainer"><Button auto type="abort">Trainer</Button></Link>
			<Link href="/routine"><Button auto type="abort">Routine</Button></Link>
			<Link href="/exercise"><Button auto type="abort">Exercise</Button></Link>
		</div>
	)
};

export default Navbar;