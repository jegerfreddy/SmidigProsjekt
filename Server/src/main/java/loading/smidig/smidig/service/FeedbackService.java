package loading.smidig.smidig.service;

import loading.smidig.smidig.model.Feedback;
import loading.smidig.smidig.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    //Get all feedback
    public List<Feedback> getFeedback() {
        return feedbackRepository.findAll();
    }

    //Get feedback by id
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    //Create feedback
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    //Delete feedback by id
    public void deleteFeedbackById(Long id) {
        feedbackRepository.deleteById(id);
    }

    //Update feedback
    public Feedback updateFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}
