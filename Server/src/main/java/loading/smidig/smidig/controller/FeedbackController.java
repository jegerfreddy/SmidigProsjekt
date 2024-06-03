package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.Feedback;
import loading.smidig.smidig.model.FeedbackDTO;
import loading.smidig.smidig.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<FeedbackDTO> getFeedback() {
        return feedbackService.getFeedback().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    //Get feedback by id
    @GetMapping("/id/{id}")
    public FeedbackDTO getFeedbackById(@PathVariable Long id) {
        return convertToDto(feedbackService.getFeedbackById(id));
    }

    //Create feedback
    @PostMapping("/new")
    public FeedbackDTO createFeedback(@RequestBody Feedback feedback) {
        return convertToDto(feedbackService.createFeedback(feedback));
    }

    //Delete feedback by id
    @DeleteMapping("/delete/{id}")
    public void deleteFeedbackById(@PathVariable Long id) {
        feedbackService.deleteFeedbackById(id);
    }

    //Update feedback
    @PutMapping("/update")
    public FeedbackDTO updateFeedback(@RequestBody Feedback feedback) {
        return convertToDto(feedbackService.updateFeedback(feedback));
    }

    //Convert to DTO
    private FeedbackDTO convertToDto(Feedback feedback) {
        FeedbackDTO feedbackDTO = new FeedbackDTO();
        feedbackDTO.setFeedbackID(feedback.getFeedbackID());
        feedbackDTO.setUserID(feedback.getUser().getUserID());
        feedbackDTO.setRating(feedback.getRating());
        return feedbackDTO;
    }
}
