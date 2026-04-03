import { routing } from "@/i18n/routing";

export const LEGAL_UPDATED_AT = "2026-04-03";

export const legalOwner = {
  name: "Samy Hajar",
  email: "samy.hajar@gmail.com",
  street: "Beckmanngasse 74/8-9",
  postalCode: "1150",
  city: "Vienna",
  cityDe: "Wien",
  country: "Austria",
  countryDe: "Österreich",
  github: "https://github.com/samyhajar",
  linkedin: "https://www.linkedin.com/in/samy-hajar-116137182/",
  calendlyPrivacyUrl: "https://calendly.com/privacy",
  vercelPrivacyUrl: "https://vercel.com/legal/privacy-policy/",
  birdPrivacyUrl: "https://bird.com/en-us/legal/privacy?sp=true",
  austrianDsbUrl: "https://dsb.gv.at/home",
} as const;

export type LegalLocale = (typeof routing.locales)[number];

export type LegalLink = {
  label: string;
  href: string;
};

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: LegalLink[];
};

export type LegalPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdatedLabel: string;
  sections: LegalSection[];
};

type LegalCopy = {
  privacy: LegalPageCopy;
  imprint: LegalPageCopy;
};

export function getLegalLocale(locale: string): LegalLocale {
  return routing.locales.includes(locale as LegalLocale)
    ? (locale as LegalLocale)
    : routing.defaultLocale;
}

export const legalCopy: Record<LegalLocale, LegalCopy> = {
  en: {
    privacy: {
      eyebrow: "Privacy",
      title: "Privacy Policy",
      description:
        "How this portfolio handles personal data, optional cookies and third-party services.",
      lastUpdatedLabel: "Last updated",
      sections: [
        {
          title: "Controller",
          paragraphs: [
            "Samy Hajar is responsible for the processing of personal data on this website.",
          ],
          bullets: [
            legalOwner.name,
            `${legalOwner.street}, ${legalOwner.postalCode} ${legalOwner.city}, ${legalOwner.country}`,
            legalOwner.email,
          ],
        },
        {
          title: "What this website does",
          paragraphs: [
            "This website is a personal portfolio. It presents selected software projects, a resume preview, project details and ways to get in touch for potential collaborations.",
            "I do not run advertising profiles or sell visitor data. Personal data is processed only when it is needed to deliver the site, protect the site, respond to inquiries or operate optional features you choose to enable.",
          ],
        },
        {
          title: "Hosting and technical access data",
          paragraphs: [
            "The website is hosted on Vercel. When you visit the site, technical request data may be processed, for example IP address, browser and device information, timestamps, requested URLs, referrer information and diagnostic log data.",
            "The purpose of this processing is stable delivery, performance, abuse prevention, security and troubleshooting. The legal basis is Article 6(1)(f) GDPR. Data is kept for as long as necessary for infrastructure operation, security and debugging under the hosting setup.",
          ],
          links: [
            {
              label: "Vercel Privacy Policy",
              href: legalOwner.vercelPrivacyUrl,
            },
          ],
        },
        {
          title: "Optional live visitor counter and cookies",
          paragraphs: [
            "The live visitor counter is optional. It stays disabled until you actively allow it through the cookie banner or the cookie settings link in the footer.",
            "If you allow it, the site opens a realtime connection through Pusher Channels by Bird and the authentication endpoint stores the cookie `portfolio_visitor_id`. That cookie contains a random identifier so a browser session can be counted consistently instead of being counted again on every reconnect.",
            "Processed data can include the random identifier, IP address, connection metadata and timestamps. The purpose is to display an approximate count of visitors currently connected to the site. The legal basis is your consent under Article 6(1)(a) GDPR together with the ePrivacy rules for non-essential storage or access on your device. The cookie can remain for up to 12 months unless you delete it earlier or withdraw consent.",
            "Inference from the service configuration: the counter uses Pusher's EU cluster, which is intended to keep realtime traffic in an EU region. Provider-level support or administrative access can still involve cross-border processing depending on the provider's own setup.",
          ],
          links: [
            {
              label: "Bird Privacy Statement",
              href: legalOwner.birdPrivacyUrl,
            },
          ],
        },
        {
          title: "Local settings, contact and scheduling",
          paragraphs: [
            "The site may store a local theme preference in your browser so your selected appearance can be remembered. This local setting is only used for the site experience and is not used to profile you across websites.",
            "If you contact me by email or use the Gmail shortcut, the data you send is processed by the mail provider you choose. If you load the booking flow, Calendly is embedded on demand. Data you enter there, such as your name, email address, selected time and any message you provide, is used to organize the requested meeting.",
            "The legal basis for contact and booking processing is Article 6(1)(b) GDPR when the request concerns a potential collaboration or pre-contractual communication, and otherwise Article 6(1)(f) GDPR for efficient communication.",
          ],
          links: [
            {
              label: "Calendly Privacy Notice",
              href: legalOwner.calendlyPrivacyUrl,
            },
          ],
        },
        {
          title: "External links and recipients",
          paragraphs: [
            "Links to GitHub, LinkedIn and other external pages only transmit data to those providers after you click them.",
            "Depending on how you use the site, recipients or service providers may include the following companies:",
          ],
          bullets: [
            "Vercel Inc. for hosting, delivery and technical infrastructure",
            "Bird / Pusher Channels for the optional live visitor counter",
            "Calendly, LLC when you intentionally load the scheduling widget",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Under the GDPR you generally have the right of access, rectification, erasure, restriction of processing, objection and data portability, provided the legal requirements are met.",
            "If you have granted consent for the live visitor counter, you can withdraw that consent at any time through the cookie settings link in the footer. Withdrawal does not affect the lawfulness of earlier processing based on consent before the withdrawal.",
          ],
        },
        {
          title: "Supervisory authority",
          paragraphs: [
            "If you believe that the processing of your personal data violates data protection law, you can contact the Austrian Data Protection Authority.",
          ],
          bullets: [
            "Österreichische Datenschutzbehörde",
            "Barichgasse 40-42, 1030 Wien, Österreich",
            "dsb@dsb.gv.at",
          ],
          links: [
            {
              label: "Austrian Data Protection Authority",
              href: legalOwner.austrianDsbUrl,
            },
          ],
        },
      ],
    },
    imprint: {
      eyebrow: "Imprint",
      title: "Legal Notice",
      description:
        "Disclosure and provider information for this portfolio website.",
      lastUpdatedLabel: "Last updated",
      sections: [
        {
          title: "Provider information",
          bullets: [
            legalOwner.name,
            legalOwner.street,
            `${legalOwner.postalCode} ${legalOwner.city}, ${legalOwner.country}`,
            legalOwner.email,
          ],
        },
        {
          title: "Purpose of this website",
          paragraphs: [
            "This website presents portfolio work, project references, a resume preview and contact options for potential software development collaborations.",
          ],
        },
        {
          title: "Media owner and content responsibility",
          paragraphs: [
            `${legalOwner.name} is the media owner and responsible for the editorial content of this website.`,
          ],
          bullets: [
            "Business focus: presentation of professional qualifications, project work and digital product development services",
            `Place of residence: ${legalOwner.city}, ${legalOwner.country}`,
          ],
        },
        {
          title: "External links",
          paragraphs: [
            "This website contains links to external third-party services, including GitHub, LinkedIn and Calendly. Responsibility for the content of those external pages lies with their respective operators.",
          ],
        },
        {
          title: "Copyright",
          paragraphs: [
            "Unless stated otherwise, the texts, layouts, images and project presentations on this website were created for this portfolio and may not be reused without prior permission.",
          ],
        },
      ],
    },
  },
  de: {
    privacy: {
      eyebrow: "Datenschutz",
      title: "Datenschutzerklärung",
      description:
        "Wie dieses Portfolio personenbezogene Daten, optionale Cookies und Drittanbieter-Dienste verarbeitet.",
      lastUpdatedLabel: "Stand",
      sections: [
        {
          title: "Verantwortlicher",
          paragraphs: [
            "Für die Verarbeitung personenbezogener Daten auf dieser Website ist Samy Hajar verantwortlich.",
          ],
          bullets: [
            legalOwner.name,
            `${legalOwner.street}, ${legalOwner.postalCode} ${legalOwner.cityDe}, ${legalOwner.countryDe}`,
            legalOwner.email,
          ],
        },
        {
          title: "Worum es auf dieser Website geht",
          paragraphs: [
            "Diese Website ist ein persönliches Portfolio. Sie zeigt ausgewählte Software-Projekte, eine eingebettete Lebenslaufansicht, Projektinformationen und Kontaktmöglichkeiten für mögliche Zusammenarbeiten.",
            "Ich betreibe keine Werbeprofile und verkaufe keine Besucherdaten. Personenbezogene Daten werden nur verarbeitet, wenn dies für die Bereitstellung der Website, die Sicherheit, die Beantwortung von Anfragen oder optionale Funktionen erforderlich ist, die Sie selbst aktivieren.",
          ],
        },
        {
          title: "Hosting und technische Zugriffsdaten",
          paragraphs: [
            "Die Website wird bei Vercel gehostet. Beim Aufruf der Seite können technische Zugriffsdaten verarbeitet werden, etwa IP-Adresse, Browser- und Geräteinformationen, Zeitstempel, aufgerufene URLs, Referrer-Informationen und Diagnosedaten.",
            "Zweck der Verarbeitung ist die stabile Bereitstellung, Performance, Missbrauchsvermeidung, Sicherheit und Fehleranalyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden so lange gespeichert, wie sie für Infrastruktur, Sicherheit und Debugging im Rahmen des Hostings erforderlich sind.",
          ],
          links: [
            {
              label: "Vercel Privacy Policy",
              href: legalOwner.vercelPrivacyUrl,
            },
          ],
        },
        {
          title: "Optionaler Live-Besucherzähler und Cookies",
          paragraphs: [
            "Der Live-Besucherzähler ist optional. Er bleibt deaktiviert, bis Sie ihn über den Cookie-Banner oder den Link zu den Cookie-Einstellungen im Footer ausdrücklich erlauben.",
            "Wenn Sie zustimmen, öffnet die Website eine Realtime-Verbindung über Pusher Channels von Bird. Zusätzlich speichert der Auth-Endpunkt das Cookie `portfolio_visitor_id`. Dieses Cookie enthält eine zufällige Kennung, damit eine Browser-Sitzung konsistent gezählt und nicht bei jeder Neuverbindung erneut erfasst wird.",
            "Verarbeitet werden können insbesondere die zufällige Kennung, die IP-Adresse, Verbindungsmetadaten und Zeitstempel. Zweck ist die Anzeige einer ungefähren Anzahl aktuell verbundener Besucherinnen und Besucher. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit den ePrivacy-Regeln für technisch nicht notwendige Speicher- oder Zugriffsvorgänge auf Ihrem Endgerät. Das Cookie kann bis zu 12 Monate bestehen bleiben, sofern Sie es nicht früher löschen oder Ihre Einwilligung widerrufen.",
            "Schlussfolgerung aus der technischen Konfiguration: Der Zähler verwendet den EU-Cluster von Pusher. Damit soll der Realtime-Verkehr in einer EU-Region verarbeitet werden. Support- oder administrative Zugriffe des Anbieters können dennoch grenzüberschreitende Verarbeitungen beinhalten.",
          ],
          links: [
            {
              label: "Bird Privacy Statement",
              href: legalOwner.birdPrivacyUrl,
            },
          ],
        },
        {
          title: "Lokale Einstellungen, Kontakt und Terminbuchung",
          paragraphs: [
            "Die Website kann eine lokale Theme-Einstellung in Ihrem Browser speichern, damit die gewählte Darstellung erhalten bleibt. Diese lokale Einstellung dient nur der Nutzung dieser Website und nicht dem Tracking über andere Websites hinweg.",
            "Wenn Sie mir per E-Mail schreiben oder den Gmail-Link verwenden, werden die von Ihnen gesendeten Daten über den von Ihnen gewählten Mail-Anbieter verarbeitet. Wenn Sie die Terminbuchung öffnen, wird Calendly gezielt eingebettet. Dabei können insbesondere Name, E-Mail-Adresse, gewählter Termin und weitere Angaben verarbeitet werden, die Sie im Buchungsformular selbst eingeben.",
            "Rechtsgrundlage für Kontakt- und Buchungsanfragen ist Art. 6 Abs. 1 lit. b DSGVO, wenn es um eine mögliche Zusammenarbeit oder vorvertragliche Kommunikation geht, sonst Art. 6 Abs. 1 lit. f DSGVO für eine effiziente Kommunikation.",
          ],
          links: [
            {
              label: "Calendly Privacy Notice",
              href: legalOwner.calendlyPrivacyUrl,
            },
          ],
        },
        {
          title: "Externe Links und Empfänger",
          paragraphs: [
            "Links zu GitHub, LinkedIn und anderen externen Seiten übertragen Daten an diese Anbieter erst, nachdem Sie den jeweiligen Link anklicken.",
            "Je nach Nutzung der Website kommen insbesondere folgende Empfänger oder Dienstleister in Betracht:",
          ],
          bullets: [
            "Vercel Inc. für Hosting, Auslieferung und technische Infrastruktur",
            "Bird / Pusher Channels für den optionalen Live-Besucherzähler",
            "Calendly, LLC, wenn Sie das Termin-Widget bewusst laden",
          ],
        },
        {
          title: "Ihre Rechte",
          paragraphs: [
            "Nach der DSGVO stehen Ihnen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit zu, soweit die gesetzlichen Voraussetzungen erfüllt sind.",
            "Eine erteilte Einwilligung für den Live-Besucherzähler können Sie jederzeit über die Cookie-Einstellungen im Footer widerrufen. Der Widerruf berührt nicht die Rechtmäßigkeit der bis dahin auf Grundlage der Einwilligung erfolgten Verarbeitung.",
          ],
        },
        {
          title: "Aufsichtsbehörde",
          paragraphs: [
            "Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt, können Sie sich an die österreichische Datenschutzbehörde wenden.",
          ],
          bullets: [
            "Österreichische Datenschutzbehörde",
            "Barichgasse 40-42, 1030 Wien, Österreich",
            "dsb@dsb.gv.at",
          ],
          links: [
            {
              label: "Österreichische Datenschutzbehörde",
              href: legalOwner.austrianDsbUrl,
            },
          ],
        },
      ],
    },
    imprint: {
      eyebrow: "Impressum",
      title: "Impressum",
      description:
        "Angaben zur Offenlegung und Anbieterkennzeichnung dieser Portfolio-Website.",
      lastUpdatedLabel: "Stand",
      sections: [
        {
          title: "Anbieter",
          bullets: [
            legalOwner.name,
            legalOwner.street,
            `${legalOwner.postalCode} ${legalOwner.cityDe}, ${legalOwner.countryDe}`,
            legalOwner.email,
          ],
        },
        {
          title: "Zweck dieser Website",
          paragraphs: [
            "Diese Website dient der Präsentation von Portfolio-Arbeiten, Projektreferenzen, einer Lebenslaufansicht und Kontaktmöglichkeiten für potenzielle Softwareentwicklungs-Zusammenarbeiten.",
          ],
        },
        {
          title: "Medieninhaber und inhaltliche Verantwortung",
          paragraphs: [
            `${legalOwner.name} ist Medieninhaber und für die redaktionellen Inhalte dieser Website verantwortlich.`,
          ],
          bullets: [
            "Unternehmensgegenstand: Darstellung beruflicher Qualifikationen, Projektarbeiten und Leistungen im Bereich digitaler Produkt- und Softwareentwicklung",
            `Wohnort bzw. Sitz: ${legalOwner.cityDe}, ${legalOwner.countryDe}`,
          ],
        },
        {
          title: "Externe Links",
          paragraphs: [
            "Diese Website enthält Links zu externen Diensten Dritter, insbesondere zu GitHub, LinkedIn und Calendly. Für die Inhalte dieser externen Seiten sind ausschließlich deren jeweilige Betreiber verantwortlich.",
          ],
        },
        {
          title: "Urheberrecht",
          paragraphs: [
            "Soweit nicht anders angegeben, wurden Texte, Layouts, Bilder und Projektpräsentationen für dieses Portfolio erstellt und dürfen ohne vorherige Zustimmung nicht weiterverwendet werden.",
          ],
        },
      ],
    },
  },
  fr: {
    privacy: {
      eyebrow: "Confidentialité",
      title: "Politique de confidentialité",
      description:
        "Comment ce portfolio traite les données personnelles, les cookies facultatifs et les services tiers.",
      lastUpdatedLabel: "Dernière mise à jour",
      sections: [
        {
          title: "Responsable du traitement",
          paragraphs: [
            "Samy Hajar est responsable du traitement des données personnelles sur ce site web.",
          ],
          bullets: [
            legalOwner.name,
            `${legalOwner.street}, ${legalOwner.postalCode} Vienne, Autriche`,
            legalOwner.email,
          ],
        },
        {
          title: "Objet de ce site",
          paragraphs: [
            "Ce site est un portfolio personnel. Il présente des projets logiciels sélectionnés, un aperçu du CV, des détails de projets et des moyens de prise de contact pour d'éventuelles collaborations.",
            "Je ne crée pas de profils publicitaires et je ne vends pas de données de visiteurs. Les données personnelles ne sont traitées que lorsqu'elles sont nécessaires pour fournir le site, protéger le site, répondre à une demande ou faire fonctionner des fonctions optionnelles que vous choisissez d'activer.",
          ],
        },
        {
          title: "Hébergement et données d'accès techniques",
          paragraphs: [
            "Le site est hébergé sur Vercel. Lors de votre visite, des données techniques peuvent être traitées, par exemple l'adresse IP, des informations sur le navigateur et l'appareil, les horodatages, les URL demandées, le référent et des données de diagnostic.",
            "La finalité de ce traitement est la mise à disposition stable du site, la performance, la prévention des abus, la sécurité et le dépannage. La base juridique est l'article 6, paragraphe 1, point f du RGPD. Les données sont conservées aussi longtemps que nécessaire pour l'exploitation de l'infrastructure, la sécurité et le débogage dans le cadre de l'hébergement.",
          ],
          links: [
            {
              label: "Vercel Privacy Policy",
              href: legalOwner.vercelPrivacyUrl,
            },
          ],
        },
        {
          title: "Compteur de visiteurs en direct et cookies facultatifs",
          paragraphs: [
            "Le compteur de visiteurs en direct est facultatif. Il reste désactivé tant que vous ne l'avez pas autorisé via la bannière cookies ou le lien des paramètres des cookies dans le pied de page.",
            "Si vous l'autorisez, le site ouvre une connexion temps réel via Pusher Channels de Bird et le point d'authentification enregistre le cookie `portfolio_visitor_id`. Ce cookie contient un identifiant aléatoire afin qu'une session de navigateur soit comptée de manière cohérente au lieu d'être recomptee à chaque reconnexion.",
            "Les données traitées peuvent inclure l'identifiant aléatoire, l'adresse IP, des métadonnées de connexion et des horodatages. La finalité est d'afficher un nombre approximatif de visiteurs actuellement connectés au site. La base juridique est votre consentement au titre de l'article 6, paragraphe 1, point a du RGPD, ainsi que les règles ePrivacy relatives au stockage ou à l'accès non essentiel sur votre appareil. Le cookie peut rester jusqu'à 12 mois sauf suppression anticipée ou retrait de votre consentement.",
            "Déduction fondée sur la configuration du service : le compteur utilise le cluster européen de Pusher. Cela vise à garder le trafic temps réel dans une région de l'UE, même si l'assistance ou l'administration du fournisseur peut encore impliquer des traitements transfrontaliers.",
          ],
          links: [
            {
              label: "Bird Privacy Statement",
              href: legalOwner.birdPrivacyUrl,
            },
          ],
        },
        {
          title: "Paramètres locaux, contact et prise de rendez-vous",
          paragraphs: [
            "Le site peut enregistrer une préférence de thème dans votre navigateur afin de mémoriser l'apparence choisie. Ce réglage local sert uniquement à l'expérience sur ce site et n'est pas utilisé pour vous suivre sur d'autres sites.",
            "Si vous me contactez par e-mail ou via le raccourci Gmail, les données que vous envoyez sont traitées par le fournisseur de messagerie que vous choisissez. Si vous ouvrez le flux de réservation, Calendly est chargé à la demande. Les données que vous saisissez, comme votre nom, votre adresse e-mail, le créneau choisi et tout message éventuel, sont utilisées pour organiser le rendez-vous demandé.",
            "La base juridique du traitement des demandes de contact et de réservation est l'article 6, paragraphe 1, point b du RGPD lorsqu'il s'agit d'une collaboration potentielle ou d'une communication précontractuelle, sinon l'article 6, paragraphe 1, point f du RGPD pour une communication efficace.",
          ],
          links: [
            {
              label: "Calendly Privacy Notice",
              href: legalOwner.calendlyPrivacyUrl,
            },
          ],
        },
        {
          title: "Liens externes et destinataires",
          paragraphs: [
            "Les liens vers GitHub, LinkedIn et d'autres pages externes ne transmettent des données à ces fournisseurs qu'après votre clic.",
            "Selon votre utilisation du site, les destinataires ou prestataires suivants peuvent intervenir :",
          ],
          bullets: [
            "Vercel Inc. pour l'hébergement, la diffusion et l'infrastructure technique",
            "Bird / Pusher Channels pour le compteur facultatif de visiteurs en direct",
            "Calendly, LLC lorsque vous chargez volontairement le widget de réservation",
          ],
        },
        {
          title: "Vos droits",
          paragraphs: [
            "Conformément au RGPD, vous disposez en principe des droits d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et de portabilité des données, sous réserve des conditions légales applicables.",
            "Si vous avez donné votre consentement pour le compteur de visiteurs en direct, vous pouvez le retirer à tout moment via le lien des paramètres des cookies dans le pied de page. Le retrait n'affecte pas la licéité du traitement effectué avant ce retrait.",
          ],
        },
        {
          title: "Autorité de contrôle",
          paragraphs: [
            "Si vous estimez que le traitement de vos données personnelles enfreint le droit applicable en matière de protection des données, vous pouvez contacter l'autorité autrichienne de protection des données.",
          ],
          bullets: [
            "Österreichische Datenschutzbehörde",
            "Barichgasse 40-42, 1030 Wien, Autriche",
            "dsb@dsb.gv.at",
          ],
          links: [
            {
              label: "Austrian Data Protection Authority",
              href: legalOwner.austrianDsbUrl,
            },
          ],
        },
      ],
    },
    imprint: {
      eyebrow: "Mentions légales",
      title: "Mentions légales",
      description:
        "Informations d'identification et de publication pour ce site portfolio.",
      lastUpdatedLabel: "Dernière mise à jour",
      sections: [
        {
          title: "Éditeur du site",
          bullets: [
            legalOwner.name,
            legalOwner.street,
            `${legalOwner.postalCode} Vienne, Autriche`,
            legalOwner.email,
          ],
        },
        {
          title: "Objet du site",
          paragraphs: [
            "Ce site présente des travaux de portfolio, des références de projets, un aperçu du CV et des moyens de contact pour d'éventuelles collaborations en développement logiciel.",
          ],
        },
        {
          title: "Propriétaire média et responsabilité éditoriale",
          paragraphs: [
            `${legalOwner.name} est le propriétaire média et la personne responsable du contenu éditorial de ce site.`,
          ],
          bullets: [
            "Objet de l'activité : présentation de qualifications professionnelles, de projets et de services de développement de produits numériques et logiciels",
            "Lieu de résidence : Vienne, Autriche",
          ],
        },
        {
          title: "Liens externes",
          paragraphs: [
            "Ce site contient des liens vers des services tiers, notamment GitHub, LinkedIn et Calendly. Les opérateurs respectifs sont seuls responsables du contenu de ces pages externes.",
          ],
        },
        {
          title: "Droit d'auteur",
          paragraphs: [
            "Sauf indication contraire, les textes, mises en page, images et présentations de projets de ce site ont été créés pour ce portfolio et ne peuvent pas être réutilisés sans autorisation préalable.",
          ],
        },
      ],
    },
  },
  es: {
    privacy: {
      eyebrow: "Privacidad",
      title: "Política de privacidad",
      description:
        "Cómo este portfolio trata los datos personales, las cookies opcionales y los servicios de terceros.",
      lastUpdatedLabel: "Última actualización",
      sections: [
        {
          title: "Responsable del tratamiento",
          paragraphs: [
            "Samy Hajar es el responsable del tratamiento de los datos personales en este sitio web.",
          ],
          bullets: [
            legalOwner.name,
            `${legalOwner.street}, ${legalOwner.postalCode} Viena, Austria`,
            legalOwner.email,
          ],
        },
        {
          title: "Qué hace este sitio",
          paragraphs: [
            "Este sitio es un portfolio personal. Presenta proyectos de software seleccionados, una vista previa del currículum, detalles de proyectos y formas de contacto para posibles colaboraciones.",
            "No creo perfiles publicitarios ni vendo datos de visitantes. Los datos personales solo se tratan cuando son necesarios para ofrecer el sitio, protegerlo, responder a consultas o hacer funcionar funciones opcionales que usted decida activar.",
          ],
        },
        {
          title: "Alojamiento y datos técnicos de acceso",
          paragraphs: [
            "El sitio está alojado en Vercel. Cuando visita la web, pueden tratarse datos técnicos de la solicitud, por ejemplo la dirección IP, información del navegador y del dispositivo, marcas de tiempo, URL solicitadas, datos de procedencia y registros de diagnóstico.",
            "La finalidad de este tratamiento es la entrega estable del sitio, el rendimiento, la prevención de abusos, la seguridad y la resolución de errores. La base jurídica es el artículo 6, apartado 1, letra f del RGPD. Los datos se conservan mientras sean necesarios para la operación de la infraestructura, la seguridad y la depuración dentro del entorno de alojamiento.",
          ],
          links: [
            {
              label: "Vercel Privacy Policy",
              href: legalOwner.vercelPrivacyUrl,
            },
          ],
        },
        {
          title: "Contador de visitantes en directo y cookies opcionales",
          paragraphs: [
            "El contador de visitantes en directo es opcional. Permanece desactivado hasta que usted lo autoriza activamente mediante la banner de cookies o el enlace de configuración de cookies del pie de página.",
            "Si lo autoriza, el sitio abre una conexión en tiempo real mediante Pusher Channels de Bird y el punto de autenticación guarda la cookie `portfolio_visitor_id`. Esa cookie contiene un identificador aleatorio para que una sesión del navegador pueda contarse de forma coherente en lugar de volver a contarse en cada reconexión.",
            "Los datos tratados pueden incluir el identificador aleatorio, la dirección IP, metadatos de conexión y marcas de tiempo. La finalidad es mostrar un recuento aproximado de visitantes conectados en ese momento. La base jurídica es su consentimiento conforme al artículo 6, apartado 1, letra a del RGPD junto con las reglas de ePrivacy para el almacenamiento o acceso no esencial en su dispositivo. La cookie puede permanecer hasta 12 meses salvo que la elimine antes o retire su consentimiento.",
            "Inferencia basada en la configuración del servicio: el contador utiliza el clúster europeo de Pusher. Esto pretende mantener el tráfico en tiempo real dentro de una región de la UE, aunque el soporte o el acceso administrativo del proveedor puede seguir implicando tratamiento transfronterizo.",
          ],
          links: [
            {
              label: "Bird Privacy Statement",
              href: legalOwner.birdPrivacyUrl,
            },
          ],
        },
        {
          title: "Ajustes locales, contacto y reserva",
          paragraphs: [
            "El sitio puede guardar una preferencia de tema en su navegador para recordar la apariencia elegida. Ese ajuste local solo se usa para la experiencia de este sitio y no para rastrearle entre sitios web.",
            "Si me contacta por correo electrónico o utiliza el acceso directo a Gmail, los datos que envíe serán tratados por el proveedor de correo que usted elija. Si abre el flujo de reserva, Calendly se carga bajo demanda. Los datos que introduzca allí, como su nombre, correo electrónico, hora elegida y cualquier mensaje adicional, se utilizan para organizar la reunión solicitada.",
            "La base jurídica para el tratamiento de las solicitudes de contacto y reserva es el artículo 6, apartado 1, letra b del RGPD cuando se trata de una posible colaboración o comunicación precontractual y, en caso contrario, el artículo 6, apartado 1, letra f del RGPD para una comunicación eficiente.",
          ],
          links: [
            {
              label: "Calendly Privacy Notice",
              href: legalOwner.calendlyPrivacyUrl,
            },
          ],
        },
        {
          title: "Enlaces externos y destinatarios",
          paragraphs: [
            "Los enlaces a GitHub, LinkedIn y otras páginas externas solo transmiten datos a esos proveedores después de que usted haga clic.",
            "Según cómo utilice el sitio, pueden intervenir los siguientes destinatarios o proveedores de servicios:",
          ],
          bullets: [
            "Vercel Inc. para alojamiento, entrega e infraestructura técnica",
            "Bird / Pusher Channels para el contador opcional de visitantes en directo",
            "Calendly, LLC cuando usted carga de forma intencionada el widget de reserva",
          ],
        },
        {
          title: "Sus derechos",
          paragraphs: [
            "Conforme al RGPD, usted dispone en general de los derechos de acceso, rectificación, supresión, limitación del tratamiento, oposición y portabilidad de los datos, siempre que se cumplan los requisitos legales.",
            "Si ha dado su consentimiento para el contador de visitantes en directo, puede retirarlo en cualquier momento mediante el enlace de configuración de cookies del pie de página. La retirada no afecta a la licitud del tratamiento realizado antes de esa retirada.",
          ],
        },
        {
          title: "Autoridad de control",
          paragraphs: [
            "Si considera que el tratamiento de sus datos personales infringe la normativa de protección de datos, puede dirigirse a la autoridad austríaca de protección de datos.",
          ],
          bullets: [
            "Österreichische Datenschutzbehörde",
            "Barichgasse 40-42, 1030 Wien, Austria",
            "dsb@dsb.gv.at",
          ],
          links: [
            {
              label: "Austrian Data Protection Authority",
              href: legalOwner.austrianDsbUrl,
            },
          ],
        },
      ],
    },
    imprint: {
      eyebrow: "Aviso legal",
      title: "Aviso legal",
      description:
        "Información de identificación y divulgación de este sitio portfolio.",
      lastUpdatedLabel: "Última actualización",
      sections: [
        {
          title: "Titular del sitio",
          bullets: [
            legalOwner.name,
            legalOwner.street,
            `${legalOwner.postalCode} Viena, Austria`,
            legalOwner.email,
          ],
        },
        {
          title: "Finalidad del sitio",
          paragraphs: [
            "Este sitio presenta trabajos de portfolio, referencias de proyectos, una vista previa del currículum y opciones de contacto para posibles colaboraciones de desarrollo de software.",
          ],
        },
        {
          title: "Titular de medios y responsabilidad editorial",
          paragraphs: [
            `${legalOwner.name} es el titular de medios y la persona responsable del contenido editorial de este sitio.`,
          ],
          bullets: [
            "Actividad: presentación de cualificaciones profesionales, trabajos de proyecto y servicios de desarrollo de productos digitales y software",
            "Lugar de residencia: Viena, Austria",
          ],
        },
        {
          title: "Enlaces externos",
          paragraphs: [
            "Este sitio contiene enlaces a servicios externos de terceros, entre ellos GitHub, LinkedIn y Calendly. Los respectivos operadores son responsables del contenido de esas páginas externas.",
          ],
        },
        {
          title: "Derechos de autor",
          paragraphs: [
            "Salvo que se indique lo contrario, los textos, diseños, imágenes y presentaciones de proyectos de este sitio han sido creados para este portfolio y no pueden reutilizarse sin autorización previa.",
          ],
        },
      ],
    },
  },
};
