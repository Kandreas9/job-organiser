export default function JobsTable({ jobs }) {
    return (
        <div className="overflow-x-auto">
            <table className="text-[.8rem] border-collapse border border-gray-main">
                <thead>
                    <tr>
                        <th className="border border-gray-main">
                            Date Candidature
                        </th>
                        <th className="border border-gray-main">Entreprise</th>
                        <th className="border border-gray-main">
                            Activité / Secteur
                        </th>
                        <th className="border border-gray-main">Ville</th>
                        <th className="border border-gray-main">
                            Poste à pouvoir ou recherché
                        </th>
                        <th className="border border-gray-main">
                            Contact NOM Prénom
                        </th>
                        <th className="border border-gray-main">
                            Contact Téléphone
                        </th>
                        <th className="border border-gray-main">
                            Contact Mail
                        </th>
                        <th className="border border-gray-main">
                            Date de relance prévue
                        </th>
                        <th className="border border-gray-main">
                            Etat (A relancer / Refus / RDV)
                        </th>
                        <th className="border border-gray-main">
                            Commentaires / Divers
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => {
                        return (
                            <tr key={job.id}>
                                <td className="border border-gray-main">
                                    {job.createdAt}
                                </td>
                                <td className="border border-gray-main">
                                    {job.entreprise}
                                </td>
                                <td className="border border-gray-main">
                                    {job.sector}
                                </td>
                                <td className="border border-gray-main">
                                    {job.city}
                                </td>
                                <td className="border border-gray-main">
                                    {job.type}
                                </td>
                                <td className="border border-gray-main">
                                    {job.contactNom}
                                </td>
                                <td className="border border-gray-main">
                                    {job.contactTel}
                                </td>
                                <td className="border border-gray-main">
                                    {job.contactMail}
                                </td>
                                <td className="border border-gray-main">
                                    {job.createdAt}
                                </td>
                                <td className="border border-gray-main">
                                    {job.state}
                                </td>
                                <td className="border border-gray-main">
                                    {job.comments}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
