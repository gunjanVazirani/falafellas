import { Row, Col, Accordion, Container } from 'react-bootstrap';
import FAQItem from './FAQItem';
import { FAQs } from './constants/FAQs';
import { useState } from 'react';

function FAQPage() {
	const [filteredFAQs, setFilteredFAQs] = useState([]);

	const handleSearch = (event) => {
		let searchQuery = event.target.value;

		setFilteredFAQs(FAQs.filter((item) => {
			return item.question.includes(searchQuery);
		}));
	}
	
	return (
		<div className='App'>
			<Container className='mt-5'>
				<Row>
					<Col />
					<Col xs={8}>
						<center>
							<h3>
								<b>How can we help you today?</b>
							</h3>
						</center>
					</Col>
					<Col />
				</Row>
				<Row>
					<Col />
					<Col xs={8}>
					<div class="col-auto mt-5">
						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<div class="input-group-text">?</div>
							</div>
							<input type="text"
								class="form-control"
								id="inlineFormInputGroup"
								placeholder="Enter your question here..."
								onChange={handleSearch}/>
						</div>
					</div>
					<Accordion defaultActiveKey="0" className='mt-5 mb-5'>
						{(filteredFAQs.length === 0 ? FAQs : filteredFAQs).map((item) => (
							<FAQItem key={item.id} id={item.id} question={item.question} answer={item.answer} />
						))}
					</Accordion>
					</Col>
					<Col />
				</Row>
			</Container>
		</div>
	)
}

export default FAQPage;