import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DownloadAttachment({ bugId }) {
    const [attachments, setAttachments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchBugDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/bugs/${bugId}`);
                if (response.data.attachments && response.data.attachments.length > 0) {
                    const fetchedAttachments = response.data.attachments.map((attachment, index) => ({
                        ...attachment,
                        url: byteArrayToBlobUrl(attachment.attachment),
                        extension: determineExtension(attachment) // This could be a future function to determine file type
                    }));
                    setAttachments(fetchedAttachments);
                } else {
                    setError('No attachments found for this bug.');
                }
            } catch (error) {
                console.error('Failed to fetch bug details:', error);
                setError('Failed to fetch attachments.');
            }
        }

        fetchBugDetails();
    }, [bugId]);

    function byteArrayToBlobUrl(byteArray) {
        const byteArrayInFormat = new Uint8Array(atob(byteArray).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArrayInFormat], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        return URL.createObjectURL(blob);
    }

    function determineExtension(attachment) {
        // Placeholder for future logic to determine file extension dynamically
        return 'xlsx'; // Default to xlsx as per current requirements
    }

    return (
        <div>
            <h1>Download Attachments</h1>
            {attachments.length > 0 ? attachments.map((attachment, index) => (
                <div key={index}>
                    <a href={attachment.url} download={`Attachment_${attachment.attachmentId}.${attachment.extension}`}>
                        Download Attachment {attachment.attachmentId}
                    </a>
                </div>
            )) : <p>{error}</p>}
        </div>
    );
}

export default DownloadAttachment;
