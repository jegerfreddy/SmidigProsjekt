package loading.smidig.smidig.repository;

import loading.smidig.smidig.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote ,Long> {
}
