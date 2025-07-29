package com.mdms.backend.parcauto.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;
import com.mdms.backend.entity.User;


@Entity
@Table(name = "centres_rattachement")
@Getter
@Setter
@NoArgsConstructor 
public class CentreRattachement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String ville;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @OneToMany(mappedBy = "centreRattachement", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<User> utilisateurs;

@OneToMany(mappedBy = "centreRattachement", cascade = CascadeType.ALL, orphanRemoval = true)
private Set<Chauffeur> chauffeurs;

@OneToMany(mappedBy = "centreRattachement", cascade = CascadeType.ALL, orphanRemoval = true)
private Set<Vehicule> vehicules;

        @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CentreRattachement that = (CentreRattachement) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "CentreRattachement{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", ville='" + ville + '\'' +
                '}';
    }
}  
