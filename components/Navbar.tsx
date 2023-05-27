import { FC } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import styles from './Navbar.module.css';

const Navbar: FC = () => {
	return (
		<Container className={styles.navbar}>
			<h3 className={styles.title}>Guitar</h3>
			<Link href="/trainer"><Button>Trainer</Button></Link>
			<Link href="/routine"><Button>Routine</Button></Link>
			<Link href="/exercise"><Button>Exercise</Button></Link>
			<Link href="/history"><Button>History</Button></Link>
		</Container>
	)
};

export default Navbar;