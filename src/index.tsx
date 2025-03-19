import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	DefaultArticleStateKeys,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './ui/select';
import { RadioGroup } from './ui/radio-group';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

interface IState {
	submited: ArticleStateType;
	selected: ArticleStateType;
}

const App = () => {
	const [state, setState] = useState<IState>({
		submited: {
			...defaultArticleState,
		},
		selected: {
			...defaultArticleState,
		},
	});

	function selectHandler(
		name: DefaultArticleStateKeys,
		selectedItem: OptionType
	) {
		if (!name || !selectedItem) return;

		setState((prev) => {
			return {
				...prev,
				selected: {
					...prev.selected,
					[name]: selectedItem,
				},
			};
		});
	}

	function resetHandler() {
		setState((prev) => {
			return {
				...prev,
				selected: {
					...defaultArticleState,
				},
				submited: {
					...defaultArticleState,
				},
			};
		});
	}

	function submitHandler() {
		setState((prev) => {
			return {
				...prev,
				submited: {
					fontFamilyOption: prev.selected.fontFamilyOption,
					fontSizeOption: prev.selected.fontSizeOption,
					fontColor: prev.selected.fontColor,
					backgroundColor: prev.selected.backgroundColor,
					contentWidth: prev.selected.contentWidth,
				},
			};
		});
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.submited.fontFamilyOption.value,
					'--font-size': state.submited.fontSizeOption.value,
					'--font-color': state.submited.fontColor.value,
					'--container-width': state.submited.contentWidth.value,
					'--bg-color': state.submited.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={submitHandler} onReset={resetHandler}>
				<Select
					title='Шрифт'
					options={fontFamilyOptions}
					selected={state.selected.fontFamilyOption}
					onChange={(selected) => selectHandler('fontFamilyOption', selected)}
				/>
				<RadioGroup
					name='fontSizeSettings'
					options={fontSizeOptions}
					selected={state.selected.fontSizeOption}
					title='Размер шрифта'
					onChange={(selected) => selectHandler('fontSizeOption', selected)}
				/>
				<Select
					title='Цвет Шрифта'
					options={fontColors}
					selected={state.selected.fontColor}
					onChange={(selected) => selectHandler('fontColor', selected)}
				/>
				<Separator />
				<Select
					title='Цвет фона'
					options={backgroundColors}
					selected={state.selected.backgroundColor}
					onChange={(selected) => selectHandler('backgroundColor', selected)}
				/>
				<Select
					title='ширина контента'
					options={contentWidthArr}
					selected={state.selected.contentWidth}
					onChange={(selected) => selectHandler('contentWidth', selected)}
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
