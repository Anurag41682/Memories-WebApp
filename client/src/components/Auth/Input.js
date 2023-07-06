function Input() {
	return (
		<div>
			<input
				name={name}
				onChange={handleChange}
				required
				autoFocus
				type={type}
			></input>
			<label>{label}</label>
		</div>
	);
}
export default Input;
