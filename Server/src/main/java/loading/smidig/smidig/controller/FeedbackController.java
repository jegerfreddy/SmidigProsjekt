package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.Act;
import loading.smidig.smidig.model.Feedback;
import loading.smidig.smidig.DTO.FeedbackDTO;
import loading.smidig.smidig.model.User;
import loading.smidig.smidig.service.ActService;
import loading.smidig.smidig.service.FeedbackService;
import loading.smidig.smidig.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://172.20.10.2:5173")
public class FeedbackController {
    private final FeedbackService feedbackService;
    private final UserService userService;
    private final ActService actService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService, UserService userService, ActService actService) {
        this.feedbackService = feedbackService;
        this.userService = userService;
        this.actService = actService;
    }

    //Logger
    private static final Logger logger = LoggerFactory.getLogger(FeedbackController.class);

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
    public FeedbackDTO createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Feedback feedbackToAdd = new Feedback();
        User user = userService.getUserById(feedbackDTO.getUserID());
        Act act = actService.getActsById(feedbackDTO.getActID());

        if (user == null || act == null) {
            throw new IllegalArgumentException("User or Act not found");
        }

        logger.info(user.getUsername() + " is creating feedback");

        feedbackToAdd.setUser(user);
        feedbackToAdd.setAct(act);
        feedbackToAdd.setRating(feedbackDTO.getRating());

        return convertToDto(feedbackService.createFeedback(feedbackToAdd));
    }

    //Delete feedback by id
    @DeleteMapping("/delete/{id}")
    public void deleteFeedbackById(@PathVariable Long id) {
        feedbackService.deleteFeedbackById(id);
    }

    //Update feedback
    @PutMapping("/update")
    public FeedbackDTO updateFeedback(@RequestBody Feedback feedback) {
        return convertToDto(feedbackService.createFeedback(feedback));
    }

    //Convert to DTO
    private FeedbackDTO convertToDto(Feedback feedback) {
        FeedbackDTO feedbackDTO = new FeedbackDTO();
        feedbackDTO.setFeedbackID(feedback.getFeedbackID());
        feedbackDTO.setUserID(feedback.getUser().getUserID());
        feedbackDTO.setRating(feedback.getRating());
        feedbackDTO.setActID(feedback.getAct().getActID());
        return feedbackDTO;
    }
}
