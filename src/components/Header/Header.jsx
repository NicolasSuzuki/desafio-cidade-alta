import { Avatar } from '@radix-ui/themes';
import { LogoCidadeAlta, avatarIcon } from '../../constants/icons';
import './Header.css';

const Header = () => {
	return (
		<div className='header-container'>
			<div className='header-items-container'>
				<div className='header-items-left-container'>
					<div className='header-logo'>
						<LogoCidadeAlta />
					</div>
					<div>Home</div>
					<div className='header-separator'>|</div>
					<div>Vip</div>
					<div className='header-separator'>|</div>
					<div>Noticias</div>
					<div className='header-separator'>|</div>
					<div>Como Jogar</div>
					<div className='header-separator'>|</div>
					<div>Contato</div>
				</div>
				<Avatar src={avatarIcon} />
			</div>
		</div>
	);
};

export default Header;
