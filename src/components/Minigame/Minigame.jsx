import React, { useEffect, useState, useRef } from 'react';
// import { MinigameDetail } from '../../constants/icons';
import { Dialog, Button, Flex, Progress } from '@radix-ui/themes';
import './Minigame.css';

const statusChallenges = {
	not_started: 'not_started',
	in_progress: 'in_progress',
	won: 'won',
	lost: 'lost',
};

const generateRandomChars = () => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const length = 6;
	let result = [];
	for (let i = 0; i < length; i++) {
		result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
	}
	return result;
};

const VerifyCode = ({ challengeValues, setStep }) => {
	const [insertedValues, setInsertedValues] = useState([]);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const inputs = useRef([]);

	const buttonStyles = {
		correct: 'minigame-item-content-input-correct',
		neutral: 'minigame-item-content-input',
	};

	useEffect(() => {
		// Enable the button if the OTP array is filled
		if (insertedValues.every((digit) => digit !== '')) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [insertedValues]);

	useEffect(() => {
		inputs.current[0].focus();
	}, []);

	const handleInputChange = (value, index) => {
		const newInsertedValues = [...insertedValues];
		newInsertedValues[index] = value;
		setInsertedValues(newInsertedValues);

		// Move focus to the next box if the current one has a value
		if (value && index < challengeValues.length - 1) {
			if (value === challengeValues[index].toLowerCase()) {
				inputs.current[index].className = buttonStyles.correct;
				inputs.current[index + 1].focus();
			} else {
				setIsButtonDisabled(true);
				setStep(statusChallenges.lost);
			}
		} else if (value && index === challengeValues.length - 1) {
			if (value === challengeValues[index].toLowerCase()) {
				setStep(statusChallenges.won);
			}
			inputs.current[0].focus();
		}
	};

	return (
		<div>
			{challengeValues?.length > 0 &&
				challengeValues.map((digit, index) => (
					<input
						className='minigame-item-content-input'
						key={index}
						disabled={isButtonDisabled}
						maxLength={1}
						onKeyDown={({ nativeEvent: { key } }) => handleInputChange(key, index)}
						value={digit}
						ref={(input) => {
							inputs.current[index] = input;
						}}
					/>
				))}
		</div>
	);
};

const instructionsByStatus = {
	[statusChallenges.not_started]: 'Clique no botão para iniciar o desafio',
	[statusChallenges.in_progress]: 'Digite o código correto',
	[statusChallenges.won]: 'Sucesso!',
	[statusChallenges.lost]: 'Você falhou',
};

const buttonByStatus = {
	[statusChallenges.not_started]: 'Iniciar',
	[statusChallenges.in_progress]: '',
	[statusChallenges.won]: 'Jogar novamente',
	[statusChallenges.lost]: 'Reiniciar',
};

const Minigame = () => {
	const [challengeValues, setChallengeValues] = useState([]);
	const [step, setStep] = useState(statusChallenges.not_started);
	const [progressBars, setProgressBars] = useState();
	const [startProgress, setStartProgress] = useState(false);
	const [endTime, setEndTime] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	const verifyIfLosed = () => {
		if (step === statusChallenges.in_progress && endTime) {
			setStep(statusChallenges.lost);
		}
	};

	const setNewChallengeValues = () => {
		setChallengeValues(generateRandomChars());
	};

	useEffect(() => {
		if (step === statusChallenges.not_started) setNewChallengeValues();

		if (startProgress) {
			setStartProgress(false);
			setTimeoutId(
				setTimeout(() => {
					setEndTime(true);
				}, 5000)
			);
		}
		if (step === statusChallenges.lost || step === statusChallenges.won) {
			clearTimeout(timeoutId);
			setEndTime(false);
			setNewChallengeValues();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [step]);

	useEffect(() => {
		if (progressBars === 'minigame-progress-start') {
			setTimeout(() => {
				setProgressBars('minigame-progress-end');
			}, 100);
		}
	}, [progressBars]);

	useEffect(() => {
		if (endTime) {
			verifyIfLosed();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [endTime]);

	return (
		<Dialog.Root>
			<Dialog.Trigger className='minigame-item-content-button'>
				<div className='minigame-item-content-button-text'>Começar Minigame</div>
			</Dialog.Trigger>
			<Dialog.Content lassName='minigame-dialog' axWidth='650px'>
				<Dialog.Title size='6'>MINI-GAME</Dialog.Title>
				<Dialog.Description size='2' mb='4'>
					{instructionsByStatus[step]}
				</Dialog.Description>

				<Flex direction='column' gap='3'>
					<label>
						{step === statusChallenges.in_progress && (
							<VerifyCode challengeValues={challengeValues} setStep={setStep} setStartProgress={setStartProgress} />
						)}
					</label>
				</Flex>

				<Flex gap='3' mt='4' justify='center' style={{ width: '100%' }}>
					{step !== statusChallenges.in_progress && (
						<Button
							onClick={() => {
								setStep(statusChallenges.in_progress);
								setStartProgress(true);
								setProgressBars('minigame-progress-start');
							}}
							className='minigame-item-content-modal-button'
						>
							<div className='minigame-item-content-button-text-white'>{buttonByStatus[step]}</div>
						</Button>
					)}
					{step === statusChallenges.in_progress && (
						<div style={{ width: '100%' }}>
							<Progress size='2' value={100} className={progressBars} />
						</div>
					)}
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default Minigame;
