
import { useTranslation } from 'react-i18next';
import CustomSelect from './CustomSelect';

export default function EpkProductionDetailsEdit({ epkInfo, onChange, errors, clearError }) {
  const { t } = useTranslation();

  // --- DYNAMIC ARRAYS FOR DROPDOWNS ---
  
  // 1. Years: From (Current Year + 5) down to 1895
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: (currentYear + 5) - 1895 + 1 }, 
    (_, i) => (currentYear + 5) - i
  );

  // 2. Durations: 1 to 300 minutes
  const durations = Array.from({ length: 300 }, (_, i) => i + 1);


  // --- STANDARD DROPDOWN ARRAYS ---
  const movieGenre = [
    t("Action"), t("Comedy"), t("Documentary"), t("Romance"), t("Horror"),
    t("Mystery"), t("Drama"), t("Western"), t("Science Fiction"), t("Thriller"),
    t("Crime"), t("Animation"), t("Musical"), t("War"), t("Romantic Comedy"),
    t("Noir"), t("Disaster"), t("Dark Comedy"), t("Historical Film"), t("Slasher"),
    t("Adventure"), t("Gangster"), t("Spy"), t("Fantasy"), t("Biographical"),
    t("Found Footage"), t("Legal Drama"), t("Melodrama"), t("Superhero"), t("Slapstick"),
    t("Monster"), t("Historical Fiction"), t("Teen"), t("Apocalyptic"), t("Post-Apocalyptic"),
    t("Psychological Thriller"), t("Stop Motion"), t("Sports"), t("Space Opera"), t("Mockumentary"),
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const languageType = [t("English"), t("French"), t("Spanish")];
  const movieStatus = [t("Preproduction"), t("Production"), t("Postproduction"), t("Completed"), t("Released")];
  const movieType = [
    { key: "Movie", label: t("Movie") },
    { key: "Documentary", label: t("Documentary") },
    { key: "TV Show", label: t("TV Show") },
    { key: "Web Series", label: t("Web Series") },
  ];
  const budgetRanges = [
    "0$ - 5,000$", "5,000$ - 10,000$", "10,000$ - 25,000$", "25,000$ - 50,000$",
    "50,000$ - 75,000$", "75,000$ - 100,000$", "100,000$ - 150,000$", "150,000$ - 200,000$",
    "200,000$ - 300,000$", "300,000$ - 500,000$", "500,000$ - 750,000$", "750,000$ - 1,000,000$",
    "1,000,000$ - 1,500,000$", "1,500,000$ - 2,000,000$", "2,000,000$ - 3,000,000$",
    "3,000,000$ - 5,000,000$", "5,000,000$ - 7,500,000$", "7,500,000$ - 10,000,000$",
  ];

  return (
    <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-y-8 tw-gap-x-6">
      
      {/* PRODUCTION YEAR (Required) */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">
          {t('Production Year')} <span className="tw-text-[#FF43A7]">*</span>
        </p>
        <div 
          className={`tw-rounded-lg tw-transition-all ${errors?.productionYear ? 'tw-ring-2 tw-ring-red-500 tw-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`}
          onClick={() => clearError && clearError('productionYear')}
        >
          <CustomSelect 
            value={epkInfo?.productionYear || ''} 
            onChange={(val) => onChange('productionYear', val)} 
            options={years.map(y => ({ value: y, label: y.toString() }))}
            placeholder={t('Select Year')}
          />
        </div>
      </div>

      {/* STUDIO */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Studio')}</p>
        <input 
          type="text" 
          value={epkInfo?.productionCo || ''} 
          onChange={(e) => onChange('productionCo', e.target.value)} 
          placeholder={t("Production Company")}
          className="tw-w-full tw-bg-[#190033] tw-border tw-border-[#5A3F49]/40 tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-text-sm tw-outline-none focus:tw-border-[#FF43A7] tw-transition-colors" 
        />
      </div>

      {/* LANGUAGE (Required) */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">
          {t('Language')} <span className="tw-text-[#FF43A7]">*</span>
        </p>
        <div 
          className={`tw-rounded-lg tw-transition-all ${errors?.language ? 'tw-ring-2 tw-ring-red-500 tw-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`}
          onClick={() => clearError && clearError('language')}
        >
          <CustomSelect 
            value={epkInfo?.language || ''} 
            onChange={(val) => onChange('language', val)} 
            options={languageType.map(l => ({ value: l, label: l }))}
           placeholder={t("Select Language")}
          />
        </div>
      </div>

      {/* BUDGET (Required) */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">
          {t('Budget (USD)')} <span className="tw-text-[#FF43A7]">*</span>
        </p>
        <div 
          className={`tw-rounded-lg tw-transition-all ${errors?.budget ? 'tw-ring-2 tw-ring-red-500 tw-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`}
          onClick={() => clearError && clearError('budget')}
        >
          <CustomSelect 
            value={epkInfo?.budget || ''} 
            onChange={(val) => onChange('budget', val)} 
            options={budgetRanges.map(b => ({ value: b, label: b }))}
            placeholder={t("Select Budget")}
          />
        </div>
      </div>

      {/* DURATION */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Duration')}</p>
        <CustomSelect 
          value={epkInfo?.durationMin ? Number(epkInfo.durationMin) : ''} 
          onChange={(val) => onChange('durationMin', val.toString())} 
          options={durations.map(d => ({ value: d, label: `${d} min` }))}
          placeholder={t('Select Duration')}
        />
      </div>

      {/* PRODUCTION TYPE */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Production Type')}</p>
        <CustomSelect 
          value={epkInfo?.production_type || ''} 
          onChange={(val) => onChange('production_type', val)} 
          options={movieType.map(m => ({ value: m.key, label: m.label }))}
          placeholder={t("Select Type")}
        />
      </div>


      {/* GENRE */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">{t('Genre')}</p>
        <CustomSelect 
          value={epkInfo?.genre || ''} 
          onChange={(val) => onChange('genre', val)} 
          options={movieGenre.map(g => ({ value: g, label: g }))}
          placeholder={t("Select Genre")}
        />
      </div>

      {/* STATUS (Required) */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <p className="tw-text-[10px] tw-text-[#AA8894] tw-uppercase tw-tracking-widest tw-font-bold">
          {t('Status')} <span className="tw-text-[#FF43A7]">*</span>
        </p>
        <div 
          className={`tw-rounded-lg tw-transition-all ${errors?.status ? 'tw-ring-2 tw-ring-red-500 tw-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`}
          onClick={() => clearError && clearError('status')}
        >
          <CustomSelect 
            value={epkInfo?.status || ''} 
            onChange={(val) => onChange('status', val)} 
            options={movieStatus.map(s => ({ value: s, label: s }))}
            placeholder={t("Select Status")}
          />
        </div>
      </div>

    </div>
  );
}