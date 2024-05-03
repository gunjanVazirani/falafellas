import Accordion from 'react-bootstrap/Accordion';
import './FAQItem.css';

function FAQItem({ id, question, answer }) {
	return (
		<div>
			<Accordion.Item eventKey={id}>
				<Accordion.Header><b>{question}</b></Accordion.Header>
				<Accordion.Body>{answer}</Accordion.Body>
			</Accordion.Item>
		</div>
	);
}

export default FAQItem;