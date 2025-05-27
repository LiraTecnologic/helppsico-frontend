import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './carrossel.css';

interface Psicologo {
  urlFoto: string;
  nome: string;
  idade: number;
  crp: string;
  mediaAvaliacoes: number;
}

interface CarrosselPsicologosProps {
  profissionais: Psicologo[];
}

export default function CarrosselPsicologos({ profissionais }: CarrosselPsicologosProps) {
  const topPsicologos = [...profissionais]
    .sort((a, b) => b.mediaAvaliacoes - a.mediaAvaliacoes)
    .slice(0, 10);

  return (
    <div className="hp-carousel-container">
        <div className="hp-cabecalho-textos">
            <h1>Ainda não tem um psicólogo?</h1>
            <h2>Descubra os profissionais indicados pelo HelpPsico</h2>
        </div>
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        centeredSlides
        slidesPerView={3}
        spaceBetween={-45}
        className="hp-carousel"
      >
        {topPsicologos.map((psicologo, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className={`hp-card ${isActive ? 'hp-active' : ''}`}>
                <div className="hp-card-image">
                  <img src={psicologo.urlFoto} alt={psicologo.nome} />
                </div>
                <div className="hp-card-name">{psicologo.nome}</div>
                <div className="hp-card-age">{psicologo.idade} anos</div>
                <div className="hp-card-crp">CRP - {psicologo.crp}</div>
                <div className="hp-card-rating">
                  {'★'.repeat(Math.round(psicologo.mediaAvaliacoes))}
                  {'☆'.repeat(5 - Math.round(psicologo.mediaAvaliacoes))}{' '}
                  <span className="hp-rating-number">({psicologo.mediaAvaliacoes})</span>
                </div>
                <div className="hp-card-button">
                  <button>Ver mais</button>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}