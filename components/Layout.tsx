import React from 'react';
import Navbar from '@/components/Navbar';
import styles from './Layout.module.css';

export interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<div className={styles.navbarContainer}>
				<Navbar />
			</div>
			<main className={styles.main}>{children}</main>
		</div>
	)
};

export default Layout;