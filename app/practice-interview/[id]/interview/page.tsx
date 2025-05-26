import { InterviewProvider } from "../../components/InterviewContext";
import InterviewInterface from "../../components/InterviewInterface";

const PracticeInterviewPage = () => {
	return (
		<InterviewProvider>
			<div className="min-h-screen bg-gray-100">
				<InterviewInterface />
			</div>
		</InterviewProvider>
	);
};

export default PracticeInterviewPage;
