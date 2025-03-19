import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	FormEvent,
	ReactElement,
	useState,
	memo,
	useEffect,
	useRef,
} from 'react';

interface IArticleParamsFormProps {
	children?: ReactElement | ReactElement[];
	onSubmit?: () => void;
	onReset?: () => void;
}

const ArticleParamsFormF = (props: IArticleParamsFormProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		document.addEventListener('mousedown', handleFormClick);

		return () => {
			document.removeEventListener('mousedown', handleFormClick);
		};
	}, []);

	function handleFormClick(event: MouseEvent) {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	}

	function handleToggleButton() {
		setIsOpen((prev) => !prev);
	}

	function onSubmintHabdler(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		setIsOpen(false);
		props.onSubmit?.();
	}

	function onResetHabdler(): void {
		props.onReset?.();
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleButton} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : null
				}`}>
				<form ref={formRef} className={styles.form} onSubmit={onSubmintHabdler}>
					{props.children ?? null}

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onResetHabdler}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

export const ArticleParamsForm = memo(ArticleParamsFormF);
