package loading.smidig.smidig.repository;

import loading.smidig.smidig.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
