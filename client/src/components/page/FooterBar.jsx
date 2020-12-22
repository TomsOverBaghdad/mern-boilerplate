import React from 'react';

import NavMenu from './NavMenu';

import './FooterBar.less';

const FooterBar = (props) => {
	if (!props.options || !props.options.length) return null;

	return (
		<NavMenu
			mode="horizontal"
			options={props.options}
			iconOnly={true}
			bottom={true}
		/>
	);
};

export default FooterBar;
