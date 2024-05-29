package loading.smidig.smidig.service;

import loading.smidig.smidig.model.Act;
import loading.smidig.smidig.model.ActEvent;
import loading.smidig.smidig.repository.ActEventRepository;
import loading.smidig.smidig.repository.ActRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActEventService {
    private final ActEventRepository actEventRepository;
    private final ActRepository actRepository;

    @Autowired
    public ActEventService(ActEventRepository actEventRepository, ActRepository actRepository) {
        this.actEventRepository = actEventRepository;
        this.actRepository = actRepository;
    }

    //Get all act events
    public List<ActEvent> getActEvents() {
        return actEventRepository.findAll();
    }

    //Get act event by ID
    public ActEvent getActEventById(Long id) {
        return actEventRepository.findById(id).orElse(null);
    }

    //Create act event
    public ActEvent createActEvent(ActEvent actEvent) {
        return actEventRepository.save(actEvent);
    }

    //Delete act event by ID
    public void deleteActEvent(Long id) {
        actEventRepository.deleteById(id);
    }

    //Update act event
    public ActEvent updateActEvent(ActEvent actEvent) {
        return actEventRepository.save(actEvent);
    }


    // Get all actEvents for a specific actID
    public List<ActEvent> getActEventsByActID(Long actID) {
        return actEventRepository.findAll()
                .stream()
                .filter(actEvent -> actEvent.getAct().getActID().equals(actID))
                .collect(Collectors.toList());
    }

    public ActEvent linkActEventToAct(Long actID, Long actEventID) {
        ActEvent actEvent = actEventRepository.findById(actEventID).orElse(null);
        if (actEvent != null) {
            Act act = actRepository.findById(actID).orElse(null);
            actEvent.setAct(act);
            return actEventRepository.save(actEvent);
        }
        return null;
    }
}
