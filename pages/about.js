import { css, jsx, Global } from '@emotion/core'

const  About = () => {
	const customBlue = '#0a0a1f';
	
	const bodyStyle = css`
		body {
			width: 100%;
			margin: 0;
		}
	`;
	const containerStyle = css`
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: ${customBlue};
		justify-content: center;
		align-items: center;
		height: 100vh;

		& img {
			width: 100%;
			margin 0 auto;
		}
	`;

	const mainTitleStyle = css`
		color: white;
		font-family: sans-serif;
	`;

	const paragraphStyle = css`
		color: white;
		font-family: sans-serif;
	`;

	

	return( 
		<div css={containerStyle}>
			<Global
				styles={bodyStyle}
			/>
			<img src="/public/platzi-logo.png" alt="Platzi Logo" />
			<h1 css={mainTitleStyle}>Creado por Daniel</h1>
			<p css={paragraphStyle}>Curso de Next.JS en Platzi</p>
		</div>
	)
}

export default About