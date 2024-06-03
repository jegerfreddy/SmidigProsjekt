package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.Feedback;
import loading.smidig.smidig.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    //Get all feedback
    @GetMapping("/all")
    public List<Feedback> getFeedback() {
        return feedbackService.getFeedback();
    }

    //Get feedback by id
    @GetMapping("/id/{id}")
    public Feedback getFeedbackById(@PathVariable Long id) {
        return feedbackService.getFeedbackById(id);
    }

    //Create feedback
    @PostMapping("/new")
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return feedbackService.createFeedback(feedback);
    }

    //Delete feedback by id
    @DeleteMapping("/delete/{id}")
    public void deleteFeedbackById(@PathVariable Long id) {
        feedbackService.deleteFeedbackById(id);
    }

    //Update feedback
    @PutMapping("/update")
    public Feedback updateFeedback(@RequestBody Feedback feedback) {
        return feedbackService.updateFeedback(feedback);
    }
}
