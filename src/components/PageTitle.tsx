import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
    title: string;
}
const PageTitle = ({ title }: Props) => {
    return (
        <Helmet>
            <title>{title} | Instaclone</title>
        </Helmet>
    );
};

export default PageTitle;
