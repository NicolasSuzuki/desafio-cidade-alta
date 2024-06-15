import { Avatar } from '@radix-ui/themes';
import { DetailsContainer, avatarIcon } from '../../constants/icons';
import './Home.css';
import Minigame from '../../container/Minigame';
const Home = () => {
	return (
		<div className='home-container'>
			<div className='home-items-container'>
				<div className='home-items-left-container'>
					<div className='home-item-content'>
						<Avatar size='8' src={avatarIcon} />
						<div className='home-item-content-text'>Desafio Cidade Alta</div>
						<a className='home-item-content-button' href='https://github.com/NicolasSuzuki/desafio-cidade-alta'>
							<div className='home-item-content-button-text'>Repositório</div>
						</a>
					</div>
					<div className='home-details-container'>
						<DetailsContainer />
					</div>
				</div>
				<div className='home-items-right-container'>
					<div className='home-details-container'>
						<DetailsContainer />
					</div>
					<div className='home-item-right-content'>
						<Minigame />
						<Avatar style={{ marginTop: '20px' }} size='8' src={avatarIcon} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
