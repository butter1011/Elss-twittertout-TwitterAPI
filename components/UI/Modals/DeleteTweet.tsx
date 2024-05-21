import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { isDeleteOpen } from '@/components/Jotai/modalAtoms';
import { useAtom } from 'jotai';
import { useContext } from 'react';
import { ToastContext } from '@/components/Contexts/ToastContext';
import { tweetUsers, tweetsList } from "@/components/Jotai/atoms";
import axios from 'axios';

const DeleteTweet = () => {
    const [isOpen, setOpen] = useAtom(isDeleteOpen);
    const { toast } = useContext<any>(ToastContext);
    const [loading, setLoading] = useState<any>(false);
    const [tweetData, setTweetData] = useAtom(tweetsList);

    const init = () => {
        setOpen(false);
        setLoading(false);
    }

    const onDelete = async () => {
        setLoading(true);
        
        axios.post("/api/v1/tweet/delete", { id: isOpen })
            .then((res) => {
                if (res.data?.status === 404) {
                    toast.error(res.data?.message);
                    init();
                    return;
                }
                
                setTweetData(res.data?.tweets);
                toast.success(res.data?.message);
                init();
            })
            .catch((e) => {
                init();
                console.log(e);
            })
    }

    return (
        <>
            <Modal isOpen={isOpen ? true : false} onClose={() => setOpen(false)} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">Twitter Delete Add</ModalHeader>
                            <ModalBody>
                                <p className='dark:text-white text-black'>
                                    Do you really want to delete this tweet?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onDelete}>
                                    {loading ?
                                        <div id="loading">
                                            <svg viewBox="10 10 20 20">
                                                <circle r="10" cy="20" cx="20"></circle>
                                            </svg>
                                        </div>
                                        : "Save"
                                    }
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteTweet